const express = require("express");
const router = express.Router();

const { todoMongoController } = require("../controller_mongo");

router.get("/:username", todoMongoController.getTodos);

router.post("/:username", todoMongoController.addTodo);

router.patch("/:username", todoMongoController.editAllStatus);
router.delete("/:id", todoMongoController.deleteTodos);

module.exports = router;
