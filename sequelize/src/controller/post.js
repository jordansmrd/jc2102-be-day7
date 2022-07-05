const { Post } = require("../lib/sequelize");

const { Op } = require("sequelize");

const postController = {
  getAllPost: async (req, res) => {
    try {
      const findPosts = await Post.findAll({
        attributes: [
          "image_url",
          ["caption", "ini_caption_modified"],
          "location",
        ],

        // where: {
        //   user_id: 2,
        // },
      });

      return res.status(200).json({
        message: "fetched data post",
        results: findPosts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  addPost: async (req, res) => {
    try {
      const { image_url, caption, location } = req.body;

      await Post.create({
        image_url,
        caption,
        location,
      });

      return res.status(200).json({
        message: "new post added",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;

      await Post.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "1 data deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
  editPost: async (req, res) => {
    try {
      const { id } = req.params;

      await Post.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "post edited",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
};

module.exports = postController;
