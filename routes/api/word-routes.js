const router = require("express").Router();

const {
  getWords,
  getSingleWord,
  createWord,
  updateWord,
  deleteWord,
  addReaction,
  removeReaction,
} = require("../../controllers/word-controller");

router.route("/").get(getWords).post(createWord);

router.route("/:wordId").get(getSingleWord).put(updateWord).delete(deleteWord);

router.route("/:wordId/reactions").post(addReaction);

router.route("/:wordId/reactions/:reactionId").delete(removeReaction);

module.exports = router;
