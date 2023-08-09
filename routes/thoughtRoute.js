const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtId,
  postThought,
  deleteThought,
} = require("../controllers/thoughtController");

router.route("/").get(getAllUsers).post(postUser);

router.route("/:userId").get(getUserId).delete(deleteUser);

router.route("/:userId/friend/:friendId").put(putFriend).delete(removeFriend);

module.exports = router;
