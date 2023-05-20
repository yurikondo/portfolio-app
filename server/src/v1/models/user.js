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
      default:
        "https://pixabay.com/get/g8e041aa4548c8a7c93a04000433929f7d8a03ecb6cbd0e7458921d2f003a990c392343a0b4695449a47589dcbc569e6cdb82812ae03ee798fcc1b50264f3a3b2_640.jpg?w=164&h=100&fit=crop&auto=format&dpr=2",
      required: true,
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
