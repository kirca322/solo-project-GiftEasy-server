const { User } = require("../database/entity");

module.exports = class UserModel {
  async findOrCreate(googleId, email, name) {
    try {
      return await User.findOrCreate({
        where: {
          googleId: googleId,
          email: email,
        },
        defaults: {
          name: name,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
};