//モデルの作成（https://mongoosejs.com/docs/models.html#compiling）
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "🙂",
      required: true,
    },
    bgImg: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
