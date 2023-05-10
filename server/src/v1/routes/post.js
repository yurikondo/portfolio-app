const router = require("express").Router();
const { body } = require("express-validator");
const postController = require("../controllers/post");
const tokenHandler = require("../handlers/tokenHandler");
const validation = require("../handlers/validation");

//メモを作成
router.post(
  "/",
  // body("itemUrl")
  //   .isLength({ min: 8 })
  //   .withMessage("URLは8文字以上で入力してください"),
  // body("desc")
  //   .isLength({ max: 100 })
  //   .withMessage("コメントは100文字以内で入力してください"),

  //エラー文をerrorsに入れる
  // validation.validate,

  postController.create
);

//ログインしているユーザーの投稿を全て取得
router.get("/", tokenHandler.verifyToken, postController.getAll);

//ログインしているユーザーの投稿を１つ取得
router.get("/:postId", tokenHandler.verifyToken, postController.getOne);

//ログインしているユーザーの投稿を１つ更新
router.put("/:postId", tokenHandler.verifyToken, postController.update);

//ログインしているユーザーの投稿を１つ削除
router.delete("/:postId", tokenHandler.verifyToken, postController.delete);

module.exports = router;
