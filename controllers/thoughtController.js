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
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
      res.json(thought);
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
      res.json({ message: "Thought successfully created" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async putThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $set: { thoughtText: req.body } }
      );

      if (!thought) {
        return res.status(404).json({ message: "Thought ID does not exist" });
      }
      res.json({ message: "Thought successfully updated." });
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
  async postReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'Thought not found' });
      }

      res.json({ message: 'Reaction added to Thought' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'ReactionId does not exist' });
      }

      res.json({ message: 'Reaction deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
