const { Comment } = require("../database/entity");

module.exports = class CommentModel {
  async findOrCreate() {
    await Comment.findOrCreate();
  }

  async create(userId, commentData) {
    await Comment.create({
      giftId: commentData.giftId,
      userId: userId,
      content: commentData.content,
    });
  }

  async findAllWithGiftId(giftId) {
    return await Comment.findAll({
      where: {
        giftId: giftId,
        isDeleted: false,
      },
    });
  }

  async findOneWithCommentId(commentId) {
    return await Comment.findOne({
      where: {
        id: commentId,
        isDeleted: false,
      },
    });
  }

  async save(comment) {
    await comment.save();
  }
};
