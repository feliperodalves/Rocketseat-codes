const mongoose = require("mongoose");

/** Default Schema for Post */
const PostSchema = new mongoose.Schema(
  {
    author: String,
    place: String,
    description: String,
    hashtags: String,
    image: String,
    likes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", PostSchema);
