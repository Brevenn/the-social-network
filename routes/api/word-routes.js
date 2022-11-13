const router = require("express").Router();

const {
  getWords,
  getSingleWord,
  createWord,
  updateWord,
  deleteWord,
} = require("../../controllers/word-controller");

const {
  addReaction,
  removeReaction,
  getReaction,
} = require("../../controllers/reaction-controller");

router.route("/").get(getWords).post(createWord);

router.route("/:wordId").get(getSingleWord).put(updateWord).delete(deleteWord);

router.route("/:wordId/reactions").post(addReaction);

router.route("/:wordId/reactions/:reactionId").get(getReaction).delete(removeReaction);

module.exports = router;
