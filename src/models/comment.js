const { Comment } = require("../database/entity");

module.exports = class CommentModel {
  async findOrCreate() {
    await Comment.findOrCreate();
  }
};
