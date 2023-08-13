const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min: [1, "text too short"],
      max: [280, "text exceeded maximum (280)"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: formattedDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

function formattedDate(createdAt) {
  return createdAt.toLocaleString("en-US");
}

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
