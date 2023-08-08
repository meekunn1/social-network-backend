const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getThoughId(req, res) {
    try {
      const thought = await Thought.findone({ _id: req.params.thoughId }).select(
        "-__V"
      );

      if (!thought) {
        return res.status(404).json({ message: "User ID does not exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async postThought(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async deleteUser(req,res) {
    try {
        const user = await User.findOneAndRemove({_id: req.param.userId});
        if (!user) {
            return res.status(404).json({message: 'User ID does not exist'})
        } 
        const thought = await Thought.deleteMany({username: req.param.user});
        res.json({message: 'User successfully deleted'});
    } catch(err) {
        res.status(500).json(err);
    }
  },
};
