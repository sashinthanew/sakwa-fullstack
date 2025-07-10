const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  vehicleType: {
    type: String,
    required: true
  },
  supplierQuantity: {
    type: Number,
    required: true
  },
  profilePhoto: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  department: {
    type: String,
    default: ""
  },
  workTime: {
    type: String,
    default: ""
  },
  workDates: {
    type: String,
    default: ""
  },
  arrivalTime: {
    type: String,
    default: ""
  },
  registerDate: {
    type: Date,
    default: Date.now
  },
  deliveries: [
    {
      date: {
        type: Date,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      qualityScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
      },
      onTime: {
        type: Boolean,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model("Supplier", supplierSchema);
