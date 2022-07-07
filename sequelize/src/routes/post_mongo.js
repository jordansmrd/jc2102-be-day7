const express = require("express");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 100000000000, //Byte
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("File harus berupa png,jpg,jpeg"), false);
    }
    cb(null, true);
  },
});

const { postMongoController } = require("../controller_mongo");

router.post(
  "/upload",
  upload.single("image"),
  postMongoController.UploadPicture
);
router.get("/", postMongoController.RenderImagebyId);

router.get("/:post_id", postMongoController.RenderImagebyPostId);

module.exports = router;
