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
    released: {
      type: String,
      required: false,
    },
    director: {
      type: String,
      required: false,
    },
    writer: {
      type: String,
      required: false,
    },
    actors: {
      type: String,
      required: false,
    },
    awards: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
  });
  
  module.exports = mongoose.model("Movie", MovieSchema);
  