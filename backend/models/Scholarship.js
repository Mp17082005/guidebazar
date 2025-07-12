const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['National', 'International']
  },
  country: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  applicationLink: {
    type: String,
    default: null
  },
  requirements: [{
    type: String
  }],
  contactEmail: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: String,
    required: true,
    default: 'admin'
  },
  category: {
    type: String,
    enum: ['Merit-based', 'Need-based', 'Research', 'Sports', 'Arts', 'Other'],
    default: 'Merit-based'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
