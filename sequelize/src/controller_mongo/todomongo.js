const bcrypt = require("bcrypt");
const Todo = require("../model_mongo/todoModel");
const User = require("../model_mongo/userModel");

const todoMongoController = {
  getTodos: async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username }).populate({
        path: "todos",
        model: Todo,
      });

      return res.status(200).json({
        message: "get all todo from " + username,
        result: user.todos,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  addTodo: async (req, res) => {
    const username = req.params.username;
    const { description } = req.body;

    try {
      const user = await User.findOne({ username });
      const owner = user._id;
      const todo = new Todo({ description, owner });

      user.todos.push(todo.id);

      let result = await todo.save();
      await user.save();

      return res.status(200).json({
        message: "new list has been created",
        result: result,
      });
    } catch (err) {
      console.log("error");
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  editAllStatus: async (req, res) => {
    const username = req.params.username;

    try {
      const user = await User.findOne({ username });
      const owner = user._id;
      const todos = await Todo.find({ owner });

      if (todos) {
        todos.forEach(async (val) => {
          val.completed = true;
          await val.save();
        });
      }

      return res.status(200).json({
        message: "All status completed ",
      });
    } catch (err) {
      console.log("error");
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  deleteTodos: async (req, res) => {
    const _id = req.params.id;

    try {
      const deleteTodo = await Todo.deleteOne({ _id });
      console.log(deleteTodo);

      return res.status(200).json({
        message: "this todo is deleted",
        result: deleteTodo,
      });
    } catch (err) {
      console.log("error");
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = todoMongoController;
