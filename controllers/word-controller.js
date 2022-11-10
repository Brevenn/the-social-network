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
        Word.findOne({ _id: req.params.wordId})
        .then((dbWordData) => {
            if (!dbWordData) {
                return res.status(404).json({ message: "no word with this id!"});
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
                { _id: req.params.userId },
                { $push: { thoughts: dbWordData._id } },
                { new: true}
            );
        })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "Word created but no user with this id!" });
            }
            res.json({ message: "Word created successfully" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
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
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbWordData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbWordData) => {
            if (!dbWordData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            return Word.deleteMany({ _id: { $in: dbWordData.thoughts } });
        })
        .then(() => {
            res.json({ message: "User and associated thoughts deleted!" });
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json(err);
        });
    },
    
    // add a friend to the friend list
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addtoSet: { friends: req.params.friendId } },
            { new: true }
        )
        .then((dbWordData) => {
            if (!dbWordData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbWordData);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json(err);
        });
    },

    // remove a friend from the friend list
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then((dbWordData) => {
            if (!dbWordData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbWordData);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json(err);
        });
    },
};

module.exports = userController;