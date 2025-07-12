const express = require('express');
const router = express.Router();

// In-memory storage for scholarships (in production, use a database)
let scholarships = [
  {
    id: 1,
    title: "Fulbright Scholarship Program",
    type: "International",
    country: "USA",
    amount: "$30,000",
    deadline: "2025-01-15",
    eligibility: "Graduate students, Young professionals",
    description: "Prestigious scholarship for international educational exchange between the US and other countries.",
  },
  {
    id: 2,
    title: "DAAD Scholarships",
    type: "International",
    country: "Germany",
    amount: "€850/month",
    deadline: "2024-12-31",
    eligibility: "Master's and PhD students",
    description: "German Academic Exchange Service scholarships for international students.",
  },
  {
    id: 3,
    title: "Commonwealth Scholarships",
    type: "International",
    country: "UK",
    amount: "Full funding",
    deadline: "2025-02-28",
    eligibility: "Citizens of Commonwealth countries",
    description: "Full scholarships for postgraduate study in the UK for Commonwealth citizens.",
  },
  {
    id: 4,
    title: "INSPIRE Fellowship",
    type: "National",
    country: "India",
    amount: "₹80,000/year",
    deadline: "2024-11-30",
    eligibility: "Science students in India",
    description: "Department of Science and Technology fellowship for pursuing research in basic sciences.",
  },
  {
    id: 5,
    title: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
    type: "National",
    country: "India",
    amount: "₹7,000/month",
    deadline: "2025-01-20",
    eligibility: "Students pursuing basic sciences",
    description: "Fellowship program by IISc and IISER for students interested in research careers in science.",
  }
];

// Get all scholarships
router.get('/', (req, res) => {
  try {
    res.json({ success: true, scholarships });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch scholarships', error: error.message });
  }
});

// Get scholarship by ID
router.get('/:id', (req, res) => {
  try {
    const scholarship = scholarships.find(s => s.id === parseInt(req.params.id));
    if (!scholarship) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }
    res.json({ success: true, scholarship });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch scholarship', error: error.message });
  }
});

// Create new scholarship
router.post('/', (req, res) => {
  try {
    const { title, type, country, amount, deadline, eligibility, description } = req.body;
    
    if (!title || !type || !country || !amount || !deadline || !eligibility || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: title, type, country, amount, deadline, eligibility, description' 
      });
    }

    const newScholarship = {
      id: Date.now(), // Simple ID generation
      title,
      type,
      country,
      amount,
      deadline,
      eligibility,
      description
    };

    scholarships.push(newScholarship);
    res.status(201).json({ success: true, scholarship: newScholarship, message: 'Scholarship created successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create scholarship', error: error.message });
  }
});

// Update scholarship
router.put('/:id', (req, res) => {
  try {
    const scholarshipId = parseInt(req.params.id);
    const scholarshipIndex = scholarships.findIndex(s => s.id === scholarshipId);
    
    if (scholarshipIndex === -1) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }

    const updatedScholarship = { ...scholarships[scholarshipIndex], ...req.body, id: scholarshipId };
    scholarships[scholarshipIndex] = updatedScholarship;
    
    res.json({ success: true, scholarship: updatedScholarship, message: 'Scholarship updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update scholarship', error: error.message });
  }
});

// Delete scholarship
router.delete('/:id', (req, res) => {
  try {
    const scholarshipId = parseInt(req.params.id);
    const scholarshipIndex = scholarships.findIndex(s => s.id === scholarshipId);
    
    if (scholarshipIndex === -1) {
      return res.status(404).json({ success: false, message: 'Scholarship not found' });
    }

    scholarships.splice(scholarshipIndex, 1);
    res.json({ success: true, message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete scholarship', error: error.message });
  }
});

module.exports = router;
