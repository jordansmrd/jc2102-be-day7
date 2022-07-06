const express = require("express");
const router = express.Router();

const { userMongoController } = require("../controller_mongo");

// router.get("/", userController.login);

router.post("/", userMongoController.register);

// router.patch("/:id", userController.editUser);

module.exports = router;
