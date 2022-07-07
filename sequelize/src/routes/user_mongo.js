const express = require("express");
const router = express.Router();

const { userMongoController } = require("../controller_mongo");

router.get("/", userMongoController.login);

router.post("/", userMongoController.register);

// router.patch("/:id", userController.editUser);

module.exports = router;
