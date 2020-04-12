const dotenv = require("dotenv");
dotenv.config();

const Service = require("../service");
const jwt = require("jsonwebtoken");

const service = new Service();

module.exports = class Controller {
  async addSurveyController(req, res) {
    await service.addSurveyService(req.body);
    res.status(200).end();
  }

  async signinController(req, res) {
    const userInfo = await service.signinService(req.body);
    const token = jwt.sign(
      {
        id: userInfo.id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "6h",
      }
    );
    res.status(200).json({ id: userInfo.id, token: token });
  }

  async getGiftListController(req, res) {
    const isMan = req.params.isMan === "man" ? true : false;
    const age = req.params.age;
    const result = await service.getGiftListService(isMan, age);
    res.status(200).json(result);
  }

  async getGiftEntryController(req, res) {
    // 해야됨
    const result = await service.getGiftEntryService(req.params.giftId, userId);
    res.status(200).json(result);
  }

  async getThumbsListController(req, res) {
    res.status(200).end();
  }
};
