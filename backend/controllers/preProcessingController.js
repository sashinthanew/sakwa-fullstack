const PreProcessing = require('../models/PreProcessing');

// @desc    Get all pre-processing checks
// @route   GET /api/pre-processing
// @access  Private
exports.getPreProcessingChecks = async (req, res) => {
  try {
    const checks = await PreProcessing.find().sort({ checkDate: -1, checkTime: -1 });
    res.status(200).json({
      success: true,
      count: checks.length,
      data: checks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new pre-processing check
// @route   POST /api/pre-processing
// @access  Private
exports.createPreProcessingCheck = async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    const check = await PreProcessing.create(req.body);
    console.log('Created pre-processing check:', check);

    res.status(201).json({
      success: true,
      data: check
    });
  } catch (error) {
    console.error('Error creating pre-processing check:', error);

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
      error: 'Server Error',
      details: error.message
    });
  }
};

// @desc    Get pre-processing summary
// @route   GET /api/pre-processing/summary
// @access  Private
exports.getPreProcessingSummary = async (req, res) => {
  try {
    const checks = await PreProcessing.find();
    
    const summary = {
      totalChecks: checks.length,
      qualityDistribution: {
        excellent: checks.filter(check => check.overallQuality === 'excellent').length,
        good: checks.filter(check => check.overallQuality === 'good').length,
        fair: checks.filter(check => check.overallQuality === 'fair').length,
        poor: checks.filter(check => check.overallQuality === 'poor').length
      },
      odourDistribution: {
        good: checks.filter(check => check.odour === 'good').length,
        not_good: checks.filter(check => check.odour === 'not_good').length
      },
      packingStatus: {
        packed: checks.filter(check => check.isPacked).length,
        notPacked: checks.filter(check => !check.isPacked).length
      },
      averageTemperature: checks.reduce((acc, check) => acc + check.temperature, 0) / checks.length || 0,
      recentChecks: checks.slice(0, 5) // Last 5 checks
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

// @desc    Get single pre-processing check
// @route   GET /api/pre-processing/:id
// @access  Private
exports.getPreProcessingCheck = async (req, res) => {
  try {
    const check = await PreProcessing.findById(req.params.id);
    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'Pre-processing check not found'
      });
    }
    res.status(200).json({
      success: true,
      data: check
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update pre-processing check
// @route   PUT /api/pre-processing/:id
// @access  Private
exports.updatePreProcessingCheck = async (req, res) => {
  try {
    const check = await PreProcessing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'Pre-processing check not found'
      });
    }
    res.status(200).json({
      success: true,
      data: check
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

// @desc    Delete pre-processing check
// @route   DELETE /api/pre-processing/:id
// @access  Private
exports.deletePreProcessingCheck = async (req, res) => {
  try {
    const check = await PreProcessing.findByIdAndDelete(req.params.id);
    if (!check) {
      return res.status(404).json({
        success: false,
        error: 'Pre-processing check not found'
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