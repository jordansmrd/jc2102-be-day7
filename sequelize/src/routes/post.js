const express = require("express");
const router = express.Router();
const fileUploader = require("../lib/uploader");

const { postController } = require("../controller");

router.get("/", postController.getAllPost);

router.post(
  "/upload",
  fileUploader({
    destinationFolder: "post_images",
    fileType: "image",
    prefix: "POST",
  }).single("image"),
  postController.uploadPost
);

router.post("/", postController.addPost);

router.patch("/:id", postController.editPost);

router.delete("/:id", postController.deletePost);

router.get("/paging", postController.getPostPaging);

router.get("/:id", postController.getPostByUser);

module.exports = router;
