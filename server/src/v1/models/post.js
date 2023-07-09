//モデルの作成（https://mongoosejs.com/docs/models.html#compiling）
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    //user情報と連携（typeとrefはセットで記述）
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemURL: {
      type: String,
      required: true,
    },
    itemImgURL: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
