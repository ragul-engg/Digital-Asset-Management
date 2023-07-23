const mongoose = require("mongoose");

const imageModel = mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageModel);
