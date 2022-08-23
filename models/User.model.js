const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }, 
    role: {
      type: String,
      enum:["user", "admin"],
      default: "user"
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
