const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer,
    },
    post_id: {
      type: Number,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.methods.toJSON = function () {
  let post = this.toObject();

  delete post.createdAt;
  delete post.updatedAt;

  return post;
};

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
