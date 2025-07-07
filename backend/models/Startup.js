const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  founder: { type: String, required: true },
  website: { type: String },
  location: { type: String },
  tags: [String],
  createdBy: { type: String, required: true }, // user id or email
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Startup', StartupSchema); 