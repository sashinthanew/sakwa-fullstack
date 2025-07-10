const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const router = express.Router();
const upload = multer();

const ROBOFLOW_API_KEY = process.env.ROBOFLOW_API_KEY;
const WORKFLOW_URL = process.env.ROBOFLOW_WORKFLOW_URL || 'https://serverless.roboflow.com/infer/workflows/fish-type-classifier/classify-and-conditionally-detect';

const allowedFishTypes = ['Salmon', 'Tuna'];

router.post('/workflow-classify', upload.single('image'), async (req, res) => {
  console.log('🚀 Roboflow endpoint was hit');

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // Log file info for debugging
    console.log('Received file:', req.file.originalname, req.file.mimetype, req.file.size);

    const base64Image = req.file.buffer.toString('base64');
    // Optionally log a short preview of the base64 string
    console.log('Base64 preview:', base64Image.substring(0, 40));

    // Prepare payload and log for debugging
    const payload = {
      api_key: ROBOFLOW_API_KEY,
      inputs: {
        image: {
          type: 'base64',
          value: base64Image
        }
      }
    };
    console.log('Sending payload to Roboflow:', {
      api_key: payload.api_key ? '***HIDDEN***' : undefined,
      imageType: payload.inputs.image.type,
      imageLength: base64Image.length
    });

    const roboflowResponse = await fetch(WORKFLOW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const roboflowText = await roboflowResponse.text();
    let roboflowData;
    try {
      roboflowData = JSON.parse(roboflowText);
    } catch (parseErr) {
      console.error('Failed to parse Roboflow response:', roboflowText);
      return res.status(500).json({ error: 'Roboflow API returned invalid JSON', details: roboflowText });
    }

    if (!roboflowResponse.ok) {
      console.error('Roboflow API error:', roboflowText);
      return res.status(500).json({ error: roboflowData.error || 'Roboflow API error', details: roboflowText });
    }

    // Log the full Roboflow response for debugging
    console.log('Roboflow response:', JSON.stringify(roboflowData));

    // Updated parsing to match new API response structure
    const classification = roboflowData.outputs?.[0]?.classification_predictions?.predictions?.[0];
    if (!classification) {
      return res.status(400).json({ error: 'No prediction found from Roboflow', details: roboflowData });
    }

    const fishType = classification.class;
    const confidence = classification.confidence;
    const isAllowed = allowedFishTypes.includes(fishType);
    const decisionMessage = isAllowed
      ? `${fishType} is allowed for production.`
      : `${fishType} is NOT accepted for production.`;

    return res.json({
      fishType,
      confidence,
      isAllowed,
      decisionMessage,
    });
  } catch (error) {
    console.error('Roboflow classification failed:', error);
    return res.status(500).json({ error: 'Roboflow classification failed', details: error.message });
  }
});

module.exports = router;
