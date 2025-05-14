const express = require('express');
const router = express.Router();
const Document = require('../models/Document');

router.post('/', async (req, res) => {
  const doc = new Document({ title: req.body.title || 'Untitled' });
  await doc.save();
  res.json(doc);
});

router.get('/:id', async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).send('Document not found');
  res.json(doc);
});

module.exports = router;
