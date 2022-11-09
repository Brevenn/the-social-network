const { User, Word } = require("../models");

const userController = {
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

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select("-__V")
        .populate("firends")
        .populate("thoughts")
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.sttus(404).json({ message: "no user with this id!"});
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}