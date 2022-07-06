const express = require("express");
const router = express.Router();

const { postController } = require("../controller");
router.get("/", postController.getAllPost);

router.post("/", postController.addPost);

router.patch("/:id", postController.editPost);

router.delete("/:id", postController.deletePost);

router.get("/paging", postController.getPostPaging);

router.get("/:id", postController.getPostByUser);

module.exports = router;
