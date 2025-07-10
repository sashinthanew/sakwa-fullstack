// routes/employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const PerformanceData = require('../models/PerformanceData');

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    // Only return active employees
    const employees = await Employee.find({ status: 'Active' });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get performance data based on timeframe
router.get('/employees/performance/data', async (req, res) => {
  try {
    const { timeframe } = req.query;
    
    if (!timeframe || !['week', 'month', 'quarter', 'year'].includes(timeframe)) {
      return res.status(400).json({ message: "Valid timeframe parameter required (week, month, quarter, year)" });
    }
    
    const performanceData = await PerformanceData.find({ timeframe });
    res.json(performanceData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ Get Employee Performance
router.get('/:id/performance', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    // Assuming these fields exist on the employee document
    const {
      performanceScore = null,
      attendance = null,
      taskCompletion = null,
      qualityOfWork = null,
      teamCollaboration = null
    } = employee;
    res.json({
      performanceScore,
      attendance,
      taskCompletion,
      qualityOfWork,
      teamCollaboration
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ Update Employee Performance
router.put('/:id/performance', async (req, res) => {
  try {
    const updateFields = ['performanceScore', 'attendance', 'taskCompletion', 'qualityOfWork', 'teamCollaboration'];
    const updates = {};
    for (const field of updateFields) {
      if (req.body[field] !== undefined) {
        const value = req.body[field];
        if (typeof value !== 'number' || value < 0 || value > 100) {
          return res.status(400).json({ message: `${field} must be a number between 0 and 100` });
        }
        updates[field] = value;
      }
    }
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➤ Create New Employee
router.post('/employees', async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const saved = await newEmployee.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get single employee by ID
router.get('/employees/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// General update employee route
router.put('/employees/:id', async (req, res) => {
  try {
    const updateFields = [
      'name', 'department', 'position', 'performanceScore', 'attendance',
      'taskCompletion', 'qualityOfWork', 'teamCollaboration', 'projectsCompleted', 'status'
    ];
    const updates = {};
    for (const field of updateFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Additional routes for creating, updating, and deleting employees...

module.exports = router;