const mongoose = require('mongoose');

const productionProcessSchema = new mongoose.Schema({
  stage: {
    type: String,
    required: true,
    enum: ['fish_filling', 'exhausting', 'seam', 'retort', 'waste_water']
  },
  inspector: {
    type: String,
    required: true,
    trim: true
  },
  supplierName: {
    type: String,
    required: true,
    trim: true
  },
  shift: {
    type: String,
    required: true,
    enum: ['morning', 'evening']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  // Fish Filling Parameters
  fishFilling: {
    time: String,
    tinWashing: String,
    lastTemperature: Number,
    roomTemperature: Number
  },
  // Exhausting Parameters
  exhausting: {
    time: String,
    exhaustingTime: String,
    exhaustingTemp: Number,
    appearance: String,
    saltTankTemp: Number
  },
  // Seam Parameters
  seam: {
    time: String,
    seamingCondition: {
      type: String,
      enum: ['verify', 'check']
    }
  },
  // Retort Parameters
  retort: {
    time: String,
    retortingPressure: Number,
    retortingTemp: Number
  },
  // Waste Water Parameters
  wasteWater: {
    time: String,
    ph: Number,
    color: String,
    odour: String
  },
  notes: {
    type: String,
    trim: true
  },
  // Overall process status
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  processDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductionProcess', productionProcessSchema); 