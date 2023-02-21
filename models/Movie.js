const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
    movieTitle: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    }
  });
  
  module.exports = mongoose.model("Movie", MovieSchema);
  