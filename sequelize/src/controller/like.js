const { Like, Post } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");
const likeController = {
  addLike: async (req, res) => {
    try {
      const { UserId, PostId } = req.body;
      const check = await Like.findOne({
        where: {
          [Op.and]: {
            UserId,
            PostId,
          },
        },
      });

      const checkPost = await Post.findOne({
        where: {
          id: PostId,
        },
      });

      console.log(check);

      if (check) {
        await Like.destroy({
          where: {
            id: check.dataValues.id,
          },
        });

        await Post.update(
          {
            number_of_likes: checkPost.dataValues.number_of_likes - 1,
          },
          { where: { id: PostId } }
        );

        return res.status(200).json({
          message: "unlike post",
        });
      }

      await Like.create({
        UserId,
        PostId,
      });
      await Post.update(
        {
          number_of_likes: checkPost.dataValues.number_of_likes + 1,
        },
        { where: { id: PostId } }
      );

      return res.status(200).json({
        message: "like post",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
};

module.exports = likeController;
