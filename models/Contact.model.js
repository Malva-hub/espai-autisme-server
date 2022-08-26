const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    secondname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    telephone: {
      type: Number,
      required: true,
    },
    isaproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
