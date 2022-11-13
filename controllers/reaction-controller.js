const { Reaction, Word } = require("../models");

const reactionController = {
  // add a friend to the friend list
  addReaction(req, res) {
    console.log(req.body, req.params);
    Word.findOneAndUpdate(
      { _id: req.params.wordId },
      { $addtoSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((dbReactionData) => {
        if (!dbReactionData) {
          return res
            .status(404)
            .json({ message: "No reaction said with this id!" });
        }
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // remove a friend from the friend list
  removeReaction(req, res) {
    Reaction.findOneAndUpdate(
      { _id: req.params.reactionId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbReactionData) => {
        if (!dbReactionData) {
          return res
            .status(404)
            .json({ message: "No reaction said with this id!" });
        }
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = reactionController;
