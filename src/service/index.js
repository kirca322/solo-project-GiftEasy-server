const UserModel = require("../models/user");
const CommentModel = require("../models/comment");
const GiftModel = require("../models/gift");
const UserThumbModel = require("../models/userThumb");
const { OAuth2Client } = require("google-auth-library");
const moment = require("moment");

const userModel = new UserModel();
const commentModel = new CommentModel();
const giftModel = new GiftModel();
const userThumbModel = new UserThumbModel();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const makeCommentList = async (userId, giftId) => {
  const commentInfo = await commentModel.findAllWithGiftId(giftId);
  const thumbsList = await userThumbModel.findAllWithUserId(userId);
  const everyUserInfo = await userModel.findAll();

  const commentList = [];
  for (let i = 0; i < commentInfo.length; i++) {
    const m = moment(new Date(commentInfo[i].createdAt));
    const time = m.format("YYYYMMDDHHmm");
    let commentEntry = {
      commentId: commentInfo[i].id,
      content: commentInfo[i].content,
      thumb: commentInfo[i].thumb,
      createdAt: time,
    };
    for (let j = 0; j < everyUserInfo.length; j++) {
      if (commentInfo[i].userId === everyUserInfo[j].id) {
        commentEntry.userName = everyUserInfo[j].name;
        commentEntry.userEmail = everyUserInfo[j].email;
      }
    }
    commentList.push(commentEntry);
  }
  let largestThumb = 0;
  let bestComment = commentList[0];
  for (let i = 0; i < commentList.length; i++) {
    if (largestThumb < commentList[i].thumb) {
      largestThumb = commentList[i].thumb;
      bestComment = commentList[i];
    }
  }
  let userThumbsList = [];
  for (let i = 0; i < thumbsList.length; i++) {
    userThumbsList.push(thumbsList[i].commentId);
  }
  let result = {
    bestComment: bestComment,
    userThumbsList: userThumbsList,
    commentList: commentList,
  };
  return result;
};

module.exports = class Service {
  async addSurveyService(surveyData) {
    const first = await giftModel.findOrCreate(surveyData.gift[0], surveyData);
    const second = await giftModel.findOrCreate(surveyData.gift[1], surveyData);
    const third = await giftModel.findOrCreate(surveyData.gift[2], surveyData);

    if (!first[1]) {
      first[0].count += 1;
      await giftModel.save(first[0]);
    }
    if (!second[1]) {
      second[0].count += 1;
      await giftModel.save(second[0]);
    }
    if (!third[1]) {
      third[0].count += 1;
      await giftModel.save(third[0]);
    }
  }

  async signinService(body) {
    const ticket = await client.verifyIdToken({
      idToken: body.tokenId,
    });
    const payload = ticket.getPayload();
    const googleId = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];
    const result = await userModel.findOrCreate(googleId, email, name);
    if (result[1]) {
      result[0].dataValues.isFirst = true;
    } else {
      result[0].dataValues.isFirst = false;
    }
    return result[0].dataValues;
  }

  async getGiftListService(isMan, age) {
    const giftList = await giftModel.findAll(isMan, age);
    return { giftList: giftList };
  }

  async getGiftEntryService(giftId, userId) {
    const giftInfo = await giftModel.findOneWithGiftId(giftId);
    const url = {
      coupang: `https://www.coupang.com/np/search?component=&q=${giftInfo.name}&channel=user`,
      eleven: `http://search.11st.co.kr/Search.tmall?redirectYN=Y&ab=B&kwd=${giftInfo.name}`,
      wemap: `https://search.wemakeprice.com/search?search_cate=top&keyword=${giftInfo.name}&isRec=1&_service=5&_type=3`,
      gmarket: `https://browse.gmarket.co.kr/search?keyword=${giftInfo.name}`,
    };
    const commentList = await makeCommentList(userId, giftId);
    const result = {
      url: url,
      ...commentList,
    };
    return result;
  }

  async addCommentService(userId, commentData) {
    await commentModel.create(userId, commentData);
    const result = await makeCommentList(userId, commentData.giftId);
    return result;
  }

  async deleteCommentService(userId, commentId, giftId) {
    let comment = await commentModel.findOneWithCommentId(commentId);
    comment.isDeleted = true;
    await commentModel.save(comment);
    const result = await makeCommentList(userId, giftId);
    return result;
  }

  async thumbUpService(commentId, userId, giftId) {
    let comment = await commentModel.findOneWithCommentId(commentId);
    comment.thumb++;
    await commentModel.save(comment);
    await userThumbModel.create(commentId, userId);
    const result = await makeCommentList(userId, giftId);
    return result;
  }

  async thumbDownService(commentId, userId, giftId) {
    let comment = await commentModel.findOneWithCommentId(commentId);
    comment.thumb--;
    await commentModel.save(comment);
    await userThumbModel.destroy(commentId, userId);
    const result = await makeCommentList(userId, giftId);
    return result;
  }
};
