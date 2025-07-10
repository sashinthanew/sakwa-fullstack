const mongoose = require('mongoose');

const employeePerformanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  month: {
    type: String,
    required: true // e.g., '2025-06'
  },
  performanceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  attendance: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  taskCompletion: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  qualityOfWork: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  teamCollaboration: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  projectsCompleted: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('EmployeePerformance', employeePerformanceSchema);
