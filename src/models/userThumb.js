const { UserThumb } = require("../database/entity");

module.exports = class UserThumbModel {
  async findAllWithUserId(userId) {
    return await UserThumb.findAll({
      where: {
        userId: userId,
      },
    });
  }

  async create(commentId, userId) {
    await UserThumb.create({
      userId: userId,
      commentId: commentId,
    });
  }

  async destroy(commentId, userId) {
    await UserThumb.destroy({
      where: {
        userId: userId,
        commentId: commentId,
      },
    });
  }
};
