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
    required: true,
  },
  bgImg: {
    type: String,
    default: "https://pixabay.com/get/g2a9f517799f1959586ae1429b2c076511317c68d484e8fd293c1deb38df644436eaac5e23ca9f4b68ca70ab6d8aca97c54ad6542382a7cb6dcb4c23497db360a_1280.jpg",
    required: true,
  },

});

module.exports = mongoose.model("User", userSchema);
