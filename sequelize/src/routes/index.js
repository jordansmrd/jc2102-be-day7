const postRoutes = require("./post");
const userRoutes = require("./user");
const userMongoRoutes = require("./user_mongo");
const todoMongoRoutes = require("./todo_mongo");
const postMongoRoutes = require("./post_mongo");
const likeRoutes = require("./like");
const commentRoutes = require("./comment");

module.exports = {
  postRoutes,
  userRoutes,
  userMongoRoutes,
  todoMongoRoutes,
  postMongoRoutes,
  likeRoutes,
  commentRoutes,
};
