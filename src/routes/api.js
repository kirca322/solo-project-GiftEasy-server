const express = require("express");
const router = express.Router();

const Controller = require("../controller");

const controller = new Controller();

router.post("/signin", controller.signinController);

router.post("/survey", controller.addSurveyController);

router.get("/gift/list/:isMan/:age", controller.getGiftListController);

router.get("/gift/:giftId", controller.getGiftEntryController);

router.get("/user/thumbs/list/:giftId", controller.getThumbsListController);

router.post("/comment", controller.addCommentController);

router.delete("/comment/:commentId", deleteCommentController);

router.post("/comment/thumb/:commentId", thumbUpController);

router.delete("/comment/thumb/:commentId", thumbDownController);

module.exports = router;
