const router = require("express").Router();
const { body } = require("express-validator");
const postController = require("../controllers/post");
const tokenHandler = require("../handlers/tokenHandler");
const validation = require("../handlers/validation");

//投稿を作成
router.post(
  "/",
  body("itemImgURL")
    .isLength({ max: 500 })
    .withMessage("URLは500文字以内で入力してください"),
  body("desc")
    .isLength({ max: 120 })
    .withMessage("コメントは120文字以内で入力してください"),

  tokenHandler.verifyToken,

  //エラー文をerrorsに入れる
  validation.validate,

  postController.create
);

//投稿を全て取得
router.get("/", tokenHandler.verifyToken, postController.getAll);

//ログインしているユーザーの投稿を全て取得
router.get("/profile", tokenHandler.verifyToken, postController.getProfilePosts);

//他のユーザーの投稿を全て取得
router.get("/profile/:userId", tokenHandler.verifyToken, postController.getSingleUserPosts);

//ログインしているユーザーいいねしている投稿を全て取得
router.get("/favorite", tokenHandler.verifyToken, postController.getLikedPosts);

//ログインしているユーザーがフォローしているユーザーの投稿を全て取得
router.get("/:userId/posts", tokenHandler.verifyToken, postController.getFollowingUsersPosts);

//投稿を取得
router.get("/:postId", tokenHandler.verifyToken, postController.getOne);

//投稿を更新
router.put("/:postId", tokenHandler.verifyToken, postController.update);

//投稿にいいね
router.put("/:id/like", tokenHandler.verifyToken, postController.like);

//投稿を削除
router.delete("/:postId", tokenHandler.verifyToken, postController.delete);

module.exports = router;
