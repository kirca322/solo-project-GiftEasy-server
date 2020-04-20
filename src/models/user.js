const { User } = require("../database/entity");

module.exports = class UserModel {
  async findOrCreate(googleId, email, name) {
    return await User.findOrCreate({
      where: {
        googleId: googleId,
        email: email,
      },
      defaults: {
        name: name,
      },
    });
  }

  async findOneWithUserId(userId) {
    return await User.findOne({
      where: {
        id: userId,
      },
    });
  }

  async findAll() {
    return await User.findAll();
  }
};
