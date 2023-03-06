const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    movieTitle: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
    poster: {
      type: String,
      required: false,
    },
    plot: {
      type: String,
      required: false,
    },
  });
  
  module.exports = mongoose.model("Movie", MovieSchema);
  