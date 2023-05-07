const router = require("express").Router();
const postController = require("../controllers/post");
const tokenHandler = require("../handlers/tokenHandler");

//メモを作成
router.post("/", tokenHandler.verifyToken, postController.create);

//ログインしているユーザーの投稿を全て取得
router.get("/", tokenHandler.verifyToken, postController.getAll);

//ログインしているユーザーの投稿を１つ取得
router.get("/:postId", tokenHandler.verifyToken, postController.getOne);

//ログインしているユーザーの投稿を１つ更新
router.put("/:postId", tokenHandler.verifyToken, postController.update);

//ログインしているユーザーの投稿を１つ削除
router.delete("/:postId", tokenHandler.verifyToken, postController.delete);

module.exports = router;
