const express = require("express");
const router = express.Router();

const { userController } = require("../controller");

router.get("/", userController.login);

router.post("/", userController.register);

router.patch("/:id", userController.editUser);

module.exports = router;
