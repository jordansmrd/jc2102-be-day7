const mongoose = require("mongoose");

const avatarSchema = new mongoose.Schema(
  {
    image: {
      type: Buffer,
    },
    user_id: {
      type: Number,
    },
  },
  { timestamps: true }
);

avatarSchema.methods.toJSON = function () {
  let avatar = this.toObject();

  delete avatar.createdAt;
  delete avatar.updatedAt;

  return avatar;
};

const Avatar = mongoose.model("Avatar", avatarSchema);
module.exports = Avatar;
