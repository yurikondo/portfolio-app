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
