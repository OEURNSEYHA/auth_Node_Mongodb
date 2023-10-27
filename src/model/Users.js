const mongoose = require("mongoose");
const userShcema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String, // Store the image URLs in an array
        required: true,
      },
    ],
    thumbnail: {
      type: String,
      
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userShcema);
