const router = require("express").Router();
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

router.put("/updateIcon", tokenHandler.verifyToken, userController.updateIcon);
router.put("/updateBgImg", tokenHandler.verifyToken, userController.updateBgImg);
router.put("/:id/follow", tokenHandler.verifyToken, userController.follow);
router.put("/:id/unfollow", tokenHandler.verifyToken, userController.unfollow);

module.exports = router;
