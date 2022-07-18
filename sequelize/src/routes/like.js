const express = require("express");
const router = express.Router();
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");

const { likeController } = require("../controller");

// router.get("/", likeController.login);

router.post("/", likeController.addLike);

module.exports = router;
