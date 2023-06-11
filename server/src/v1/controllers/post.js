const Post = require("../models/post");
const User = require("../models/user");

exports.create = async (req, res) => {
  const itemImgURL = req.body.itemImgURL;
  const desc = req.body.desc;
  try {
    //投稿の新規作成
    const post = await Post.create({
      user: req.user._id,
      itemImgURL: itemImgURL,
      desc: desc,
    });
    return res.status(201).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    //投稿を全取得
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(20);
    const selectUserInfoWithPosts = async (post) => {
      return await User.findOne({ _id: post.user });
    };
    const promises = posts.map((post) => {
      return selectUserInfoWithPosts(post);
    });
    const UserInfoWithPosts = await Promise.all(promises);
    // アイコン情報はusersテーブルに持っている
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getProfilePosts = async (req, res) => {
  try {
    //ログインしているユーザーの投稿を全取得
    const posts = await Post.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};
exports.getFollowingUsersPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const followings = user.followings;
    const posts = await Post.find({ user: { $in: followings } })
      .sort({ createdAt: -1 })
      .limit(20);
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getOne = async (req, res) => {
  // URLのパラメーターを取得
  const { postId } = req.params;
  try {
    //投稿の内容を取得
    const post = await Post.findOne({ user: req.user._id, _id: postId });
    if (!post) return res.status(404).json("投稿が存在しません❌");
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.update = async (req, res) => {
  // URLのパラメーターを取得
  const { postId } = req.params;
  const { desc } = req.body;
  try {
    //投稿の内容を取得
    const post = await Post.findOne({ user: req.user._id, _id: postId });
    if (!post) return res.status(404).json("投稿が存在しません❌");

    const updatedPost = await Post.findByIdAndUpdate(postId, {
      // 全ての項目を更新
      $set: req.body,
    });
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  // URLのパラメーターを取得
  const { postId } = req.params;
  try {
    //投稿の内容を取得
    const post = await Post.findOne({ user: req.user._id, _id: postId });
    if (!post) return res.status(404).json("投稿が存在しません❌");

    await Post.deleteOne({ _id: postId });
    return res.status(200).json("投稿を削除しました🗑️");
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //まだいいねをしてなかったらいいねできる
    //配列なのでincludes関数が使える
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({
        //配列にpushする
        $push: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json({ isLiked: true });
      // すでにいいねが押されていたらいいねしているユーザーIDを取り除く
    } else {
      await post.updateOne({
        //配列にpushする
        $pull: {
          likes: req.body.userId,
        },
      });
      return res.status(200).json({ isLiked: false });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
