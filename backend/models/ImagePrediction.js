const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  imageName: String,
  predictions: [
    {
      name: String,
      value: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('ImagePrediction', predictionSchema);
