const { User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const userController = {
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      console.log(user);

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = bcrypt.compareSync(password, user.password);

      if (!checkPass) {
        throw new Error("username/email/password not found");
      }

      delete user.dataValues.password;

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
  register: async (req, res) => {
    try {
      const { username, password, full_name, email } = req.body;

      const hashedPassword = bcrypt.hashSync(password, 5);

      const registerUser = await User.create({
        username,
        password: hashedPassword,
        full_name,
        email,
      });

      return res.status(200).json({
        message: "new user has been created",
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

module.exports = userController;
