const mongoose = require('mongoose');

const qualityCheckSchema = new mongoose.Schema({
  inspector: {
    type: String,
    required: [true, 'Inspector name is required'],
    trim: true
  },
  checkTime: {
    type: String,
    required: [true, 'Check time is required']
  },
  checkDate: {
    type: Date,
    required: [true, 'Check date is required']
  },
  results: {
    type: String,
    required: [true, 'Results are required'],
    enum: ['pass', 'fail', 'pending'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('QualityCheck', qualityCheckSchema); 