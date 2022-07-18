const express = require("express");
const router = express.Router();
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");

const { commentController } = require("../controller");

router.get("/", commentController.fetchComment);

router.post("/", commentController.postComment);

module.exports = router;
