const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  label: String,
  confidence: Number,
});

const materialAnalysisSchema = new mongoose.Schema({
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    default: null
  },
  predictions: [predictionSchema],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('MaterialAnalysis', materialAnalysisSchema);
