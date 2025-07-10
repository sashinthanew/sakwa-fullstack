const express = require('express');
const multer = require('multer');
const fs = require('fs');
const axios = require('axios');
const router = express.Router();
const MaterialAnalysis = require('../models/MaterialAnalysis');

const upload = multer({ dest: 'uploads/' });

const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY;
const CLARIFAI_MODEL_ID = process.env.CLARIFAI_MODEL_ID;

// POST /api/clarifai/analyze-image
router.post('/analyze-image', upload.single('image'), async (req, res) => {
  try {
    const supplierId = req.body.supplierId || null;
    const base64Image = fs.readFileSync(req.file.path, { encoding: 'base64' });

    const response = await axios.post(
      `https://api.clarifai.com/v2/models/${CLARIFAI_MODEL_ID}/outputs`,
      {
        inputs: [
          {
            data: {
              image: { base64: base64Image },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Key ${CLARIFAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    fs.unlinkSync(req.file.path);

    const predictions = response.data.outputs[0].data.concepts.slice(0, 3).map((p) => ({
      label: p.name,
      confidence: p.value,
    }));

    const record = new MaterialAnalysis({
      supplierId,
      predictions
    });

    await record.save();

    res.json({ prediction: predictions, saved: true });
  } catch (error) {
    console.error("Clarifai Error:", error.message);
    res.status(500).json({ error: 'Image analysis failed' });
  }
});

// GET /api/clarifai/history
router.get('/history', async (req, res) => {
  try {
    const results = await MaterialAnalysis.find().sort({ uploadedAt: -1 }).populate('supplierId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

module.exports = router;
