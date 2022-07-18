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
const Like = require("../models/like")(sequelize);
const Comment = require("../models/comment")(sequelize);
const Session = require("../models/session")(sequelize);
const VerificationToken = require("../models/verification_token")(sequelize);

// 1 : M
Post.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Post, { foreignKey: "user_id" });

//Like
// Post.belongsToMany(User, { through: Like });
// User.belongsToMany(Post, { through: Like });
User.hasMany(Like, { foreignKey: "UserId" });
Like.belongsTo(User, { foreignKey: "UserId" });
Post.hasMany(Like, { foreignKey: "PostId" });
Like.belongsTo(Post, { foreignKey: "PostId" });

//Comment
// Post.belongsToMany(User, { through: Comment });
// User.belongsToMany(Post, { through: Comment });
User.hasMany(Comment, { foreignKey: "UserId" });
Comment.belongsTo(User, { foreignKey: "UserId" });
Post.hasMany(Comment, { foreignKey: "PostId" });
Comment.belongsTo(Post, { foreignKey: "PostId" });

//Session
Session.belongsTo(User, { foreignKey: "user_id" })
User.hasMany(Session, { foreignKey: "user_id" })

//Verification
VerificationToken.belongsTo(User, { foreignKey: "user_id" })
User.hasMany(VerificationToken, { foreignKey: "user_id" })

module.exports = {
  sequelize,
  Post,
  User,
  Comment,
  Like,
  Session,
  VerificationToken
};
