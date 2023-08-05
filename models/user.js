const { Schema, model } = require("mongoose");

const validateEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;

const userSchema = new Schema({
  user: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [validateEmail],
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: "thought" }],
  frends: [{ type: Schema.Types.ObjectId, ref: this }],
});

const User = model("user", userSchema);

module.exports = User;
