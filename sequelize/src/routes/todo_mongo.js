const express = require("express");
const router = express.Router();

const { todoMongoController } = require("../controller_mongo");

// router.get("/", userController.login);

router.post("/", todoMongoController.addTodo);

// router.patch("/:id", userController.editUser);

module.exports = router;
