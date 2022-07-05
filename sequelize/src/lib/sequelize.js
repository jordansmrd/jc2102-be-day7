const { Sequelize } = require("sequelize");
const dbConfig = require("../configs/database");

const sequelize = new Sequelize({
  username: dbConfig.MYSQL_USERNAME,
  password: dbConfig.MYSQL_PASSWORD,
  database: dbConfig.MYSQL_DB_NAME,
  port: dbConfig.MYSQL_PORT,
  dialect: "mysql",
});

//models
const User = require("../models/user")(sequelize);
const Post = require("../models/post")(sequelize);

// 1 : M
Post.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  Post,
  User,
};
