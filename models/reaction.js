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

// const Reaction = model("reaction", reactionSchema);

module.exports = reactionSchema;
