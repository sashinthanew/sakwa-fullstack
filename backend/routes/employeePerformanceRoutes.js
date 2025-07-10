const express = require('express');
const router = express.Router();
const EmployeePerformance = require('../models/EmployeePerformance');

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'EmployeePerformance route is working!' });
});

// POST /api/performance: Add or update performance based on employeeId + month
router.post('/', async (req, res) => {
  try {
    const { employeeId, month, performanceScore, attendance, taskCompletion, qualityOfWork, teamCollaboration, projectsCompleted } = req.body;
    if (!employeeId || !month) {
      return res.status(400).json({ message: 'employeeId and month are required' });
    }
    const update = {
      performanceScore,
      attendance,
      taskCompletion,
      qualityOfWork,
      teamCollaboration,
      projectsCompleted
    };
    const perf = await EmployeePerformance.findOneAndUpdate(
      { employeeId, month },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json(perf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/performance: Fetch all performance records with employee populated
router.get('/', async (req, res) => {
  try {
    const records = await EmployeePerformance.find().populate('employeeId');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk upload endpoint for employee performance
router.post('/bulk', async (req, res) => {
  try {
    const records = Array.isArray(req.body) ? req.body : [];
    let updated = 0;
    for (const rec of records) {
      const { employeeId, month } = rec;
      if (!employeeId || !month) continue;
      await EmployeePerformance.findOneAndUpdate(
        { employeeId, month },
        { $set: rec },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      updated++;
    }
    res.json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
