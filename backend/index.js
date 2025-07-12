require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/guidebazaar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Health check endpoint
app.get('/', (req, res) => {
  res.send('GuideBazaar backend is running!');
});

// API routes
app.use('/api/startups', require('./routes/startups'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/events', require('./routes/events'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api', require('./routes/admin'));

// TODO: Add API routes for startups and marketplace

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});