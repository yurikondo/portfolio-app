const User = require("../models/user");

exports.updateIcon = async (req, res) => {
  const { icon } = req.body;
  const user = req.user;

  try {
    if (icon === "") req.body.icon = "🙂";

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      icon: icon,
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.updateBgImg = async (req, res) => {
  const { bgImg } = req.body;
  const user = req.user;

  try {
    if (bgImg === "") {
      req.body.bgImg =
        "https://pixabay.com/get/g8e041aa4548c8a7c93a04000433929f7d8a03ecb6cbd0e7458921d2f003a990c392343a0b4695449a47589dcbc569e6cdb82812ae03ee798fcc1b50264f3a3b2_640.jpg?w=164&h=100&fit=crop&auto=format&dpr=2";
    }

    console.log(bgImg);
    const updatedUser = await User.findByIdAndUpdate(user._id, {
      bgImg: bgImg,
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};
