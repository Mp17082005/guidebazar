const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['startup', 'tech', 'workshop', 'seminar', 'conference', 'networking', 'other']
  },
  attendees: {
    type: Number,
    default: 0
  },
  maxAttendees: {
    type: Number,
    required: true
  },
  daysLeft: {
    type: Number,
    default: 0
  },
  image: {
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
  registrationLink: {
    type: String,
    default: null
  },
  fee: {
    type: String,
    default: 'Free'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
