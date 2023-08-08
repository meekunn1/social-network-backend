const { User, Thought, Reaction } = require("../models");

module.exports = {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getUserId(req, res) {
    try {
      const user = await User.findone({ _id: req.params.userId }).select(
        "-__V"
      );

      if (!user) {
        return res.status(404).json({ message: "User ID does not exist" });
      }
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
