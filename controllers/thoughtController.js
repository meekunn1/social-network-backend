const { User, Thought } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThoughtId(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.thoughId,
      }).select("-__V");

      if (!thought) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async postThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const updateUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } }
      );
      if (!updateUser) {
        return res.status(404).json({ message: "User ID does not exist" });
      }
      res.json(newThought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.param.thoughtId,
      });
      if (!thought) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
