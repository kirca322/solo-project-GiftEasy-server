require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwtMiddleware = require("express-jwt-middleware");
const Controller = require("../controller");

const jwtCheck = jwtMiddleware(process.env.JWT_SECRET_KEY);
const controller = new Controller();

router.post("/signin", controller.signinController);

router.post("/survey", jwtCheck, controller.addSurveyController);

router.get(
  "/gift/list/:isMan/:age",
  jwtCheck,
  controller.getGiftListController
);

router.get("/gift/:giftId", jwtCheck, controller.getGiftEntryController);

router.post("/comment", jwtCheck, controller.addCommentController);

router.delete(
  "/comment/:commentId/:giftId",
  jwtCheck,
  controller.deleteCommentController
);

router.post(
  "/comment/thumb/:commentId/:giftId",
  jwtCheck,
  controller.thumbUpController
);

router.delete(
  "/comment/thumb/:commentId/:giftId",
  jwtCheck,
  controller.thumbDownController
);

module.exports = router;
