const { UserThumb } = require("../database/entity");

module.exports = class UserThumbModel {
  async findOrCreate() {
    await UserThumb.findOrCreate();
  }
};
