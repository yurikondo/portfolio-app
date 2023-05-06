//モデルの作成（https://mongoosejs.com/docs/models.html#compiling）
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  },
});

module.exports = mongoose.model("User", userSchema);
