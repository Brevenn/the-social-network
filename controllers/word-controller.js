const { Word, User } = require("../models");

const wordController = {
  // get all whats the word comments
  getWords(req, res) {
    Word.find()
      .sort({ createdAt: -1 })
      .then((dbWordData) => {
        res.json(dbWordData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get one word by id
  getSingleWord(req, res) {
    Word.findOne({ _id: req.params.wordId })
      .then((dbWordData) => {
        if (!dbWordData) {
          return res
            .status(404)
            .json({ message: "no word said with this id!" });
        }
        res.json(dbWordData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // create a new 'whats the word'
  createWord(req, res) {
    Word.create(req.body)
      .then((dbWordData) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { reactions: dbWordData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: "Word created but no user with this id!" });
        }
        res.json({ message: "Word created successfully" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // update a "whats the word" comment
  updateWord(req, res) {
    Word.findOneAndUpdate(
      { _id: req.params.wordId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbWordData) => {
        if (!dbWordData) {
          return res
            .status(404)
            .json({ message: "No Word said with this id!" });
        }
        res.json(dbWordData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // delete a "whats the word" comment
  deleteWord(req, res) {
    Word.findOneAndDelete({ _id: req.params.wordId })
      .then((dbWordData) => {
        if (!dbWordData) {
          return res
            .status(404)
            .json({ message: "No word said with this id!" });
        }
        return Word.findOneAndUpdate(
          { reactions: req.params.wordId },
          { $pull: { reactions: req.params.wordId } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res
            .status(404)
            .json({ message: " Word said but no user with this id!" });
        }
        res.json({ message: "Word successfully deleted!" });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

};

module.exports = wordController;
