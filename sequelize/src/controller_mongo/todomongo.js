const bcrypt = require("bcrypt");
const Todo = require("../model_mongo/todoModel");
const userMongoController = {
  login: async (req, res) => {
    try {
      res.status(200).json({
        message: "login succeed",
        result: user,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  addTodo: async (req, res) => {
    const todo = new Todo(req.body);

    try {
      let result = await todo.save();
      return res.status(200).json({
        message: "new user has been created",
        result: result,
      });
    } catch (err) {
      console.log("error");
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  editUser: (req, res) => {},
};

module.exports = userMongoController;
