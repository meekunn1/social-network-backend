const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find().select('-__v');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getUserId(req, res) {
    try {
      const user = await User.findById(req.params.userId).select("-__v");
      if (!user) {
        return res.status(404).json({ message: "User ID does not exist" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async postUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });
      if (!user) {
        return res.status(404).json({ message: "User ID does not exist" });
      }
      const thought = await Thought.deleteMany({ username: req.params.userId });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "User ID does not have thought entry" });
      }
      res.json({ message: "User successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async putFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } },
        { new: true }
      );

      if (!newFriend) {
        return res.status(404).json({
          message: "User or Friend id does not exist.",
        });
      }
      res.json({ message: "New friend have been added to this user." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.param.userId },
        { $pull: { friend: req.params.friendId } },
        { new: true }
      );

      if (!newFriend) {
        return res.status(404).json({
          message: "User or Friend id does not exist.",
        });
      }
      res.json({ message: "A friend have been removed from this user." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
