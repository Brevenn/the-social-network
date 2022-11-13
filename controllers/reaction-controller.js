const { Reaction, Word } = require("../models");

const reactionController = {
  // add a friend to the friend list
  addReaction(req, res) {
    console.log(req.body, req.params);
    Word.findOneAndUpdate(
      { _id: req.params.wordId },
      { $push: { reactions: req.body } },
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
    console.log(req.params);
    Word.findOneAndUpdate(
        { _id: req.params.wordId },
        {
          $pull: {reactions: { _id : req.params.reactionId} },
        },
        {
          new: true,
        }
      )  
    .then(
      (dbReactionData) => {
        if (!dbReactionData) {
          return res
            .status(404)
            .json({ message: "No reaction said with this id!" });
        }
        res.json(dbReactionData);
      }
    );
  },
  getReaction(req, res) {
    Word.find({reaction: { _id: req.params.reactionId } })
      .then((dbReactionData) => {
        res.json(dbReactionData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
    }
};

module.exports = reactionController;
