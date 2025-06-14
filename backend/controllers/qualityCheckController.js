const QualityCheck = require('../models/QualityCheck');

// @desc    Get all quality checks
// @route   GET /api/quality-checks
// @access  Private
exports.getQualityChecks = async (req, res) => {
  try {
    const qualityChecks = await QualityCheck.find().sort({ checkDate: -1, checkTime: -1 });
    res.status(200).json({
      success: true,
      count: qualityChecks.length,
      data: qualityChecks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new quality check
// @route   POST /api/quality-checks
// @access  Private
exports.createQualityCheck = async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Debug log

    // Validate required fields
    const { inspector, checkTime, checkDate, results } = req.body;
    if (!inspector || !checkTime || !checkDate || !results) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        details: {
          inspector: !inspector ? 'Inspector name is required' : null,
          checkTime: !checkTime ? 'Check time is required' : null,
          checkDate: !checkDate ? 'Check date is required' : null,
          results: !results ? 'Results are required' : null
        }
      });
    }

    // Validate results enum
    if (!['pass', 'fail', 'pending'].includes(results)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid results value',
        details: 'Results must be one of: pass, fail, pending'
      });
    }

    const qualityCheck = await QualityCheck.create(req.body);
    console.log('Created quality check:', qualityCheck); // Debug log

    res.status(201).json({
      success: true,
      data: qualityCheck
    });
  } catch (error) {
    console.error('Error creating quality check:', error); // Debug log

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

// @desc    Get single quality check
// @route   GET /api/quality-checks/:id
// @access  Private
exports.getQualityCheck = async (req, res) => {
  try {
    const qualityCheck = await QualityCheck.findById(req.params.id);
    if (!qualityCheck) {
      return res.status(404).json({
        success: false,
        error: 'Quality check not found'
      });
    }
    res.status(200).json({
      success: true,
      data: qualityCheck
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update quality check
// @route   PUT /api/quality-checks/:id
// @access  Private
exports.updateQualityCheck = async (req, res) => {
  try {
    const qualityCheck = await QualityCheck.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    if (!qualityCheck) {
      return res.status(404).json({
        success: false,
        error: 'Quality check not found'
      });
    }
    res.status(200).json({
      success: true,
      data: qualityCheck
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete quality check
// @route   DELETE /api/quality-checks/:id
// @access  Private
exports.deleteQualityCheck = async (req, res) => {
  try {
    const qualityCheck = await QualityCheck.findByIdAndDelete(req.params.id);
    if (!qualityCheck) {
      return res.status(404).json({
        success: false,
        error: 'Quality check not found'
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