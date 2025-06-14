const express = require('express');
const router = express.Router();
const {
  getPreProcessingChecks,
  createPreProcessingCheck,
  getPreProcessingCheck,
  updatePreProcessingCheck,
  deletePreProcessingCheck,
  getPreProcessingSummary
} = require('../controllers/preProcessingController');

router
  .route('/')
  .get(getPreProcessingChecks)
  .post(createPreProcessingCheck);

router
  .route('/:id')
  .get(getPreProcessingCheck)
  .put(updatePreProcessingCheck)
  .delete(deletePreProcessingCheck);

router.get('/summary', getPreProcessingSummary);

module.exports = router; 