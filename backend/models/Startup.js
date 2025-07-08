const mongoose = require('mongoose');

const StartupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  founder: { type: String, required: true },
  founderLinkedin: { type: String },
  foundedYear: { type: Number },
  website: { type: String },
  location: { type: String },
  tags: [String],
  positions: [{
    type: { type: String, enum: ['Internship', 'Part-time', 'Full-time'] },
    role: String,
    applyLink: String
  }],
  createdBy: { type: String }, // user id or email, now optional
  industry: { type: String },
  logo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Startup', StartupSchema);