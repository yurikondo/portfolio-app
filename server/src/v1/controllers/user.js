const User = require("../models/user");

exports.getOne = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getLatestUsers = async (req, res) => {
  try {
    //投稿を全取得
    const latestUsers = await User.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json(latestUsers);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getFollowingUsers = async (req, res) => {
  const loginUserId = req.user._id.toString();
  try {
    const followingUsers = await User.find({ followers: { $in: loginUserId} });
    return res.status(200).json(followingUsers);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getFollowerUsers = async (req, res) => {
  const loginUserId = req.user._id.toString();
  try {
    const followerUsers = await User.find({ followings: { $in: loginUserId } });
    return res.status(200).json(followerUsers);
  } catch (err) {
    return res.status(500).json(err);
  }
};


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

    const updatedUser = await User.findByIdAndUpdate(user._id, {
      bgImg: bgImg,
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.follow = async (req, res) => {
  const loginUserId = req.user._id.toString();
  const userId = req.params.id;

  if (loginUserId !== userId) {
    try {
      const user = await User.findById(userId);
      const currentUser = await User.findById(loginUserId);
      //フォロワーに自分がいなかったらフォローできる
      //配列なのでincludes関数が使える
      if (!user.followers.includes(loginUserId)) {
        await user.updateOne({
          //配列にpushする
          $push: {
            followers: loginUserId,
          },
        });
        await currentUser.updateOne({
          $push: {
            followings: userId,
          },
        });
      } else {
        return res
          .status(403)
          .json("あなたはすでにこのユーザーをフォローしています❌");
      }
      return res.status(200).json({isFollow: true});
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(500).json("自分自身をフォローできません❌");
  }
};

exports.unfollow = async (req, res) => {
  const loginUserId = req.user._id.toString();
  const userId = req.params.id;

  if (loginUserId !== userId) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(loginUserId);

      //フォロワーに自分がいたらフォロー解除できる
      //配列なのでincludes関数が使える
      if (user.followers.includes(loginUserId)) {
        await user.updateOne({
          //配列にpushする
          $pull: {
            followers: loginUserId,
          },
        });
        await currentUser.updateOne({
          $pull: {
            followings: userId,
          },
        });
      } else {
        return res.status(403).json("このユーザーはフォロー解除できません❌");
      }
      return res.status(200).json({isFollow: false});
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(500).json("自分自身をフォロー解除できません❌");
  }
};

// exports.updateDesc = async (req, res) => {
//   const { desc } = req.body;
//   const user = req.user;

//   try {
//     const updatedUser = await User.findByIdAndUpdate(user._id, {
//       desc: desc,
//     });

//     return res.status(200).json(updatedUser);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };
