const express = require('express');
const PDFDocument = require('pdfkit');
const router = express.Router();

router.post('/generate-label', async (req, res) => {
  const { fishType, confidence, batchId, date } = req.body;

  const doc = new PDFDocument();
  let buffers = [];

  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename=Label-${batchId}.pdf`,
      'Content-Length': pdfData.length
    });
    res.send(pdfData);
  });

  doc.fontSize(20).text('Fish Batch Label', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Batch ID: ${batchId}`);
  doc.text(`Fish Type: ${fishType}`);
  doc.text(`Confidence: ${(confidence * 100).toFixed(2)}%`);
  doc.text(`Date: ${date}`);
  doc.end();
});

module.exports = router;
