const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      required: true,
      // default: new Schema.Types.ObjectId,
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
      default: Date(Date.now()),
      get: formattedDate
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

function formattedDate(createdAt) {
  return createdAt.toLocaleString("en-US")
}

module.exports = reactionSchema;
