const ProductionProcess = require('../models/ProductionProcess');

// @desc    Get all production process records
// @route   GET /api/production-process
// @access  Private
exports.getProductionProcesses = async (req, res) => {
  try {
    const processes = await ProductionProcess.find().sort({ date: -1 });
    res.status(200).json({
      success: true,
      count: processes.length,
      data: processes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new production process record
// @route   POST /api/production-process
// @access  Private
exports.createProductionProcess = async (req, res) => {
  try {
    const process = await ProductionProcess.create(req.body);
    res.status(201).json({
      success: true,
      data: process
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get production process summary
// @route   GET /api/production-process/summary
// @access  Private
exports.getProductionSummary = async (req, res) => {
  try {
    const processes = await ProductionProcess.find();
    
    const summary = {
      totalRecords: processes.length,
      stageDistribution: {
        fish_filling: processes.filter(p => p.stage === 'fish_filling').length,
        exhausting: processes.filter(p => p.stage === 'exhausting').length,
        seam: processes.filter(p => p.stage === 'seam').length,
        retort: processes.filter(p => p.stage === 'retort').length,
        waste_water: processes.filter(p => p.stage === 'waste_water').length
      },
      shiftDistribution: {
        morning: processes.filter(p => p.shift === 'morning').length,
        evening: processes.filter(p => p.shift === 'evening').length
      },
      recentProcesses: processes.slice(0, 5) // Last 5 processes
    };

    res.status(200).json({
      success: true,
      data: summary
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single production process record
// @route   GET /api/production-process/:id
// @access  Private
exports.getProductionProcess = async (req, res) => {
  try {
    const process = await ProductionProcess.findById(req.params.id);
    if (!process) {
      return res.status(404).json({
        success: false,
        error: 'Production process record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: process
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update production process record
// @route   PUT /api/production-process/:id
// @access  Private
exports.updateProductionProcess = async (req, res) => {
  try {
    const process = await ProductionProcess.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!process) {
      return res.status(404).json({
        success: false,
        error: 'Production process record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: process
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete production process record
// @route   DELETE /api/production-process/:id
// @access  Private
exports.deleteProductionProcess = async (req, res) => {
  try {
    const process = await ProductionProcess.findByIdAndDelete(req.params.id);
    if (!process) {
      return res.status(404).json({
        success: false,
        error: 'Production process record not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}; 