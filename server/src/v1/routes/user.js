const router = require("express").Router();
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

//ユーザーのアイコン更新API
router.put("/updateIcon", tokenHandler.verifyToken, userController.updateIcon);
router.put("/updateBgImg", tokenHandler.verifyToken, userController.updateBgImg);

module.exports = router;
