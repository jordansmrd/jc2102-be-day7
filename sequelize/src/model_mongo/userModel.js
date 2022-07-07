const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, //tipe data string
      unique: true, //value tidak boleh sama
      required: true, // wajib diisi
      set: (val) => val.replace(/ /g, ""), //mengganti spasi dengan string kosong antara karakter
      validate(value) {
        // handle jika yang diinput bukan string
        let result = isNaN(parseInt(value));

        if (!result) {
          throw new Error("username tidak boleh angka");
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true, //menghapus spasi sebelum dan sesudah data input
      validate(value) {
        // handle jika yang diinput bukan string
        let result = isNaN(parseInt(value));

        if (!result) {
          throw new Error("nama tidak boleh angka");
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("email tidak valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    age: {
      type: Number,
      default: 0,
      set: (val) => parseInt(val),
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "todos",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
      },
    ],
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  let user = this.toObject();

  delete user.password;
  delete user.__v;
  delete user.createdAt;
  delete user.updatedAt;
  delete user.todos;

  return user;
};

userSchema.pre("save", async function (next) {
  let user = this;

  try {
    if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 5);
    }
  } catch (err) {
    console.log(err);
    throw new Error("Problem with Hash Password");
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
