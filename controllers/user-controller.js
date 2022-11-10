const { response } = require("express");
const { User, Word } = require("../models");
const responseSchema = require("../models/response");

const userController = {

    // get all users
    getUsers(req, res) {
        User.find()
        .select("-__v")
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // get one user by id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select("-__V")
        .populate("firends")
        .populate("thoughts")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "no user with this id!"});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
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
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            return Word.deleteMany({ _id: { $in: dbUserData.thoughts } });
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
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbUserData);
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
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({ message: "No user with this id!" });
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            response.status(500).json(err);
        });
    },
};

module.exports = userController;