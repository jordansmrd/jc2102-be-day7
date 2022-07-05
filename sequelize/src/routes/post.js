const express = require("express");
const router = express.Router();

const { Post } = require("../lib/sequelize");

const { Op } = require("sequelize");
const { postController } = require("../controller");
router.get("/", postController.getAllPost);

router.post("/", postController.addPost);

router.patch("/:id", postController.editPost);

router.delete("/:id" , postController.deletePost);

module.exports = router;
