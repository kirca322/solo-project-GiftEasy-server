const UserModel = require("../models/user");
const CommentModel = require("../models/comment");
const GiftModel = require("../models/gift");
const UserThumbModel = require("../models/userThumb");
const { OAuth2Client } = require("google-auth-library");

const userModel = new UserModel();
const commentModel = new CommentModel();
const giftModel = new GiftModel();
const userThumbModel = new UserThumbModel();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    return result[0].dataValues;
  }

  async getGiftListService(isMan, age) {
    const giftList = await giftModel.findAll(isMan, age);
    return { giftList: giftList };
  }

  async getGiftEntryController(giftId, userId) {}
};
