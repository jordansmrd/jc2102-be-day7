const express = require("express");
const router = express.Router();
const { authorizedLoggedInUser } = require("../middlewares/authMiddleware");
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

const { userController } = require("../controller");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.post(
  "/edit-profile",
  upload.single("image"),
  userController.editProfile
);

router.get("/refresh-token", authorizedLoggedInUser, userController.keepLogin);

router.get("/avatar/:user_id", userController.renderAvatar);

router.patch("/verify/:vertoken", userController.verifyUser);

router.post("/register/v2", userController.registerUserV2);
router.post("/login/v2", userController.loginV2);



module.exports = router;
