const bcrypt = require("bcrypt");
const User = require("../model_mongo/userModel");
const userMongoController = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User Not Found");
      }

      let checkPass = bcrypt.compareSync(password, user.password);

      if (!checkPass) {
        throw new Error("Wrong Password");
      }

      return res.status(200).json({
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
  register: async (req, res) => {
    const user = new User(req.body);

    try {
      let result = await user.save();
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
