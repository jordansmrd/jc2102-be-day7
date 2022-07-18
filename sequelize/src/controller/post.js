const { Post, User, Like, Comment } = require("../lib/sequelize");
const sharp = require("sharp");

const postMongo = require("../model_mongo/postModel");

const postController = {
  getAllPost: async (req, res) => {
    try {
      const findPost = await Post.findAll({
        include: [User, Like, Comment],
        limit: 10,
        offset: 0,
      });
      return res.status(200).json({
        message: "fetched data post",
        results: findPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  getPostPaging: async (req, res) => {
    try {
      const { limit = 2, page = 1 } = req.query;

      const findPost = await Post.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
      });

      return res.status(200).json({
        message: "fetching data",
        result: findPost,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },
  getPostByUser: async (req, res) => {
    try {
      const { username } = req.params;
      // console.log("halo");
      const findPost = await Post.findAll({
        include: [
          Like,
          Comment,
          {
            model: User,
            where: {
              username,
            },
          },
        ],
      });

      console.log(findPost);

      return res.status(200).json({
        message: "fetching data",
        results: findPost,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },
  getPostByLiked: async (req, res) => {
    try {
      const { id } = req.params;
      const findPost = await Post.findAll({
        include: [
          User,
          Comment,
          {
            model: Like,
            where: {
              UserId: id,
            },
          },
        ],
      });
      console.log(findPost);
      return res.status(200).json({
        message: "fetching data",
        results: findPost,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
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
      console.log(req.body);

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
  uploadPost: async (req, res) => {
    try {
      const { caption, location, user_id } = req.body;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "post_images";
      const { filename } = req.file;
      console.log("halo");

      const newPost = await Post.create({
        image_url: `${uploadFileDomain}/${filePath}/${filename}`,
        caption,
        location,
        user_id,
      });

      return res.status(201).json({
        message: "Post created",
        result: newPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  uploadwithMongo: async (req, res) => {
    try {
      console.log("sadas");
      const { caption, location, user_id } = req.body;

      let pic = await sharp(req.file.buffer).resize(365, 280).png().toBuffer();

      // let image_url = `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_POST}/${postSQL.id}`;

      const lastPostId = await Post.findOne({
        order: [["id", "DESC"]],
      });

      const postid = lastPostId.dataValues.id + 1;

      const postSQL = await Post.create({
        image_url: `http://${process.env.UPLOAD_FILE_DOMAIN}/${process.env.PATH_POST}/${postid}`,
        caption,
        location,
        user_id,
      });

      let post_mongo = new postMongo();
      post_mongo.image = pic;
      post_mongo.post_id = postid == postSQL.id ? postid : null;
      post_mongo.owner = null;
      await post_mongo.save();

      // await Post.update(
      //   {
      //     image_url,
      //   },
      //   {
      //     where: {
      //       id: postSQL.id,
      //     },
      //   }
      // );

      return res.status(200).json({
        message: "photo added",
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
