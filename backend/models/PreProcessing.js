const mongoose = require('mongoose');

const preProcessingSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: [true, 'Supplier name is required'],
    trim: true
  },
  inspector: {
    type: String,
    required: [true, 'Inspector name is required'],
    trim: true
  },
  checkDate: {
    type: Date,
    required: [true, 'Check date is required']
  },
  checkTime: {
    type: String,
    required: [true, 'Check time is required']
  },
  odour: {
    type: String,
    required: [true, 'Odour assessment is required'],
    enum: ['good', 'not_good'],
    default: 'good'
  },
  appearance: {
    type: String,
    required: [true, 'Appearance assessment is required'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Size assessment is required'],
    trim: true
  },
  isPacked: {
    type: Boolean,
    required: [true, 'Packing status is required'],
    default: false
  },
  temperature: {
    type: Number,
    required: [true, 'Temperature is required']
  },
  overallQuality: {
    type: String,
    required: [true, 'Overall quality assessment is required'],
    enum: ['excellent', 'good', 'fair', 'poor'],
    default: 'good'
  },
  notes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('PreProcessing', preProcessingSchema); 