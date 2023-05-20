const router = require("express").Router();
const { body } = require("express-validator");
const postController = require("../controllers/post");
const tokenHandler = require("../handlers/tokenHandler");
const validation = require("../handlers/validation");

//メモを作成
router.post(
  "/",
  // body("itemImgURL")
  //   .isLength({ min: 8 })
  //   .withMessage("URLは8文字以上で入力してください"),
  // body("desc")
  //   .isLength({ max: 100 })
  //   .withMessage("コメントは100文字以内で入力してください"),

  tokenHandler.verifyToken,
  //エラー文をerrorsに入れる
  validation.validate,

  postController.create
);

//投稿を全て取得
router.get("/", tokenHandler.verifyToken, postController.getAll);

//投稿を取得
router.get("/:postId", tokenHandler.verifyToken, postController.getOne);

//投稿を更新
router.put("/:postId", tokenHandler.verifyToken, postController.update);

//投稿にいいね
router.put("/:id/like", tokenHandler.verifyToken, postController.like);

//投稿を削除
router.delete("/:postId", tokenHandler.verifyToken, postController.delete);

module.exports = router;
