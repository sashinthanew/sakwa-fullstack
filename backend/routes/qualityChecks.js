const express = require('express');
const router = express.Router();
const {
  getQualityChecks,
  createQualityCheck,
  getQualityCheck,
  updateQualityCheck,
  deleteQualityCheck
} = require('../controllers/qualityCheckController');

router
  .route('/')
  .get(getQualityChecks)
  .post(createQualityCheck);

router
  .route('/:id')
  .get(getQualityCheck)
  .put(updateQualityCheck)
  .delete(deleteQualityCheck);

module.exports = router; 