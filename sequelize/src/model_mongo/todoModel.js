const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        let result = isNaN(parseInt(value));
        if (!result) {
          throw new Error("User tidak boleh angka");
        }
      },
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

todoSchema.methods.toJSON = function () {
  let todo = this.toObject();

  delete todo.createdAt;
  delete todo.updatedAt;

  return todo;
};

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
