const express = require('express');
const router = express.Router();
const {
  getProductionProcesses,
  createProductionProcess,
  getProductionProcess,
  updateProductionProcess,
  deleteProductionProcess,
  getProductionSummary
} = require('../controllers/productionProcessController');

router
  .route('/')
  .get(getProductionProcesses)
  .post(createProductionProcess);

router
  .route('/:id')
  .get(getProductionProcess)
  .put(updateProductionProcess)
  .delete(deleteProductionProcess);

router.get('/summary', getProductionSummary);

module.exports = router; 