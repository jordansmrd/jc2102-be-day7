const bcrypt = require("bcrypt");
const Post = require("../model_mongo/postModel");
const User = require("../model_mongo/userModel");

const sharp = require("sharp");

const postMongoController = {
  UploadPicture: async (req, res) => {
    const { owner, post_id } = req.query;
    // jika berhasil melewati filter name maka akan ada di 'req.file'
    console.log("test");
    try {
      let pic = await sharp(req.file.buffer).png().toBuffer();
      let post = new Post();
      post.image = pic;
      post.post_id = post_id;
      post.owner = owner;
      let user = await User.findById(owner);
      user.posts.push(post._id);
      await post.save();
      await user.save();
      console.log("test");

      return res.status(200).json({
        message: "photo added",
        result: { ...req.body },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  RenderImagebyId: async (req, res) => {
    try {
      const { _id } = req.query;

      const post = await Post.findOne({ _id });

      if (!post) {
        throw new Error("No Image Found");
      }

      res.set("Content-type", "image/png");

      res.send(post.image);
    } catch (err) {
      res.send(err);
    }
  },

  RenderImagebyPostId: async (req, res) => {
    try {
      // Get user
      const { post_id } = req.params;

      const post = await Post.findOne({ post_id });

      if (!post) {
        throw new Error("No Image Found");
      }

      // Config untuk mengirim image
      res.set("Content-type", "image/png");

      // Kirim image
      res.send(post.image);
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = postMongoController;
