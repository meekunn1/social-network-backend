const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtId,
  postThought,
  deleteThought,
} = require("../controllers/thoughtController");

router.route("/").get(getAllThoughts).post(postThought);

router.route("/:thoughtId").get(getThoughtId).delete(deleteThought);

module.exports = router;
