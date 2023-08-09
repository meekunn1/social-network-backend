const router = require("express").Router();
const {
  getAllUsers,
  getUserId,
  postUser,
  deleteUser,
  putFriend,
  removeFriend,
} = require("../controllers/userController");

router.route("/").get(getAllUsers).post(postUser);

router.route("/:userId").get(getUserId).delete(deleteUser);

router.route("/:userId/friend/:friendId").put(putFriend).delete(removeFriend);

module.exports = router;
