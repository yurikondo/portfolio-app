const Post = require("../models/post");

exports.create = async (req, res) => {
  try {
    //投稿の新規作成
    const post = await Post.create({
      user: req.user._id,
    });
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    //ログインしているユーザーの投稿を全て取得
    const posts = await Post.find({ user: req.user._id });
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
  const { description } = req.body;
  try {
    //投稿の内容を取得
    const post = await Post.findOne({ user: req.user._id, _id: postId });
    if (!post) return res.status(404).json("投稿が存在しません❌");

    const updatedMemo = await Post.findByIdAndUpdate(postId, {
      // 全ての項目を更新
      $set: req.body,
    });

    return res.status(200).json(updatedMemo);
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

    await Post.deleteOne({ _id: memoId });
    return res.status(200).json("投稿を削除しました🗑️");
  } catch (err) {
    return res.status(500).json(err);
  }
};
