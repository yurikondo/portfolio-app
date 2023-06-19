const router = require("express").Router();
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");

router.get("/getOne/:userId", tokenHandler.verifyToken, userController.getOne);
router.get(
  "/getLatestUsers",
  tokenHandler.verifyToken,
  userController.getLatestUsers
);
router.get(
  "/getUsersByIds",
  tokenHandler.verifyToken,
  userController.getUsersByIds
);
router.get(
  "/getFollowingUsers",
  tokenHandler.verifyToken,
  userController.getFollowingUsers
);
router.get(
  "/getFollowerUsers",
  tokenHandler.verifyToken,
  userController.getFollowerUsers
);
router.get(
  "/getSingleUserFollowerUsers/:userId",
  tokenHandler.verifyToken,
  userController.getSingleUserFollowerUsers
);
router.put("/updateIcon", tokenHandler.verifyToken, userController.updateIcon);
router.put(
  "/updateBgImg",
  tokenHandler.verifyToken,
  userController.updateBgImg
);
router.put("/:id/follow", tokenHandler.verifyToken, userController.follow);
router.put("/:id/unfollow", tokenHandler.verifyToken, userController.unfollow);

module.exports = router;
