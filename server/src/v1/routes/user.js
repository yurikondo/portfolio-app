const router = require("express").Router();
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

//ユーザーのアイコン更新API
router.put("/updateIcon", tokenHandler.verifyToken, userController.updateIcon);

module.exports = router;
