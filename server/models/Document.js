const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: String,
  content: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);
