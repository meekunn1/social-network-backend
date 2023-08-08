const { Schema, model } = require("mongoose");
const reactionSchema = require("./reaction");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    reactionBody: {
      type: String,
      required: true,
      max: [280, "text exceeded maximum (280)"],
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

reactionSchema.virtual("formattedDate").get(function () {
  return createdAt.toLocaleDateString();
});

const Thought = model("reaction", reactionSchema);

module.exports = Thought;
