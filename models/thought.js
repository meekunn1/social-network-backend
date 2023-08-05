const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: [1, "text too short"],
    max: [280, "text exceeded maximum (280)"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  reactions: [reactionSchema],
});

const Thought = model("thought", userSchema);

module.exports = Thought;
