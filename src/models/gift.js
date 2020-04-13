const { Gift } = require("../database/entity");

module.exports = class GiftModel {
  async findOrCreate(giftName, surveyData) {
    return await Gift.findOrCreate({
      where: {
        name: giftName,
        isMan: surveyData.isMan,
        age: surveyData.age,
      },
    });
  }

  async save(data) {
    await data.save();
  }

  async findAll(isMan, age) {
    return await Gift.findAll({
      limit: 10,
      order: [["count", "DESC"]],
      where: {
        isMan: isMan,
        age: age,
      },
    });
  }

  async findOneWithGiftId(giftId) {
    return await Gift.findOne({
      where: {
        id: giftId,
      },
    });
  }
};
