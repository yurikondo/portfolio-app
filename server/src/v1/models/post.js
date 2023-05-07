//モデルの作成（https://mongoosejs.com/docs/models.html#compiling）
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  //user情報と連携（typeとrefはセットで記述）
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  itemUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Post", postSchema);
