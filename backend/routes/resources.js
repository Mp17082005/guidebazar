const express = require('express');
const router = express.Router();

// Mock data for student discounts and scholarships
let studentDiscounts = [
  {
    id: 1,
    brand: "Canva",
    title: "Canva Pro Free for 12 Months",
    description: "Access premium templates, remove backgrounds, and collaborate with your team",
    category: "Creative Tools",
    verification: "GitHub Student Pack",
    discount: "100% OFF",
    originalPrice: "$119.99/year",
    eligibility: "Requires GitHub Student Developer Pack verification",
    instructions: "Sign up for GitHub Student Pack, then claim Canva Pro through the pack dashboard",
    link: "https://education.github.com/pack",
    verified: "2024-01-15",
    upvotes: 245,
    image: "🎨",
    tags: ["Design", "Templates", "Collaboration"],
    isLimitedTime: false,
    isPopular: true,
    active: true
  },
  // Add more discount items here
];

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
    link: "https://fulbright.org",
    active: true
  },
  // Add more scholarship items here
];

// GET all student discounts
router.get('/student-discounts', (req, res) => {
  try {
    const { category, verification, search, sortBy } = req.query;
    
    let filteredDiscounts = studentDiscounts.filter(discount => discount.active);
    
    // Apply filters
    if (category && category !== 'All') {
      filteredDiscounts = filteredDiscounts.filter(discount => 
        discount.category === category
      );
    }
    
    if (verification && verification !== 'All') {
      filteredDiscounts = filteredDiscounts.filter(discount => 
        discount.verification === verification
      );
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredDiscounts = filteredDiscounts.filter(discount =>
        discount.title.toLowerCase().includes(searchTerm) ||
        discount.brand.toLowerCase().includes(searchTerm) ||
        discount.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Apply sorting
    if (sortBy) {
      switch (sortBy) {
        case 'Popular':
          filteredDiscounts.sort((a, b) => b.upvotes - a.upvotes);
          break;
        case 'New':
          filteredDiscounts.sort((a, b) => 
            new Date(b.verified).getTime() - new Date(a.verified).getTime()
          );
          break;
        case 'Limited Time':
          filteredDiscounts.sort((a, b) => 
            (b.isLimitedTime ? 1 : 0) - (a.isLimitedTime ? 1 : 0)
          );
          break;
      }
    }
    
    res.json({
      success: true,
      data: filteredDiscounts,
      total: filteredDiscounts.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student discounts',
      error: error.message
    });
  }
});

// GET single student discount
router.get('/student-discounts/:id', (req, res) => {
  try {
    const { id } = req.params;
    const discount = studentDiscounts.find(d => d.id === parseInt(id) && d.active);
    
    if (!discount) {
      return res.status(404).json({
        success: false,
        message: 'Student discount not found'
      });
    }
    
    res.json({
      success: true,
      data: discount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching student discount',
      error: error.message
    });
  }
});

// POST upvote a student discount
router.post('/student-discounts/:id/upvote', (req, res) => {
  try {
    const { id } = req.params;
    const discountIndex = studentDiscounts.findIndex(d => d.id === parseInt(id));
    
    if (discountIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student discount not found'
      });
    }
    
    studentDiscounts[discountIndex].upvotes += 1;
    
    res.json({
      success: true,
      message: 'Upvote recorded successfully',
      data: studentDiscounts[discountIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error recording upvote',
      error: error.message
    });
  }
});

// GET all scholarships
router.get('/scholarships', (req, res) => {
  try {
    const { country, type, search } = req.query;
    
    let filteredScholarships = scholarships.filter(scholarship => scholarship.active);
    
    // Apply filters
    if (country && country !== 'all') {
      filteredScholarships = filteredScholarships.filter(scholarship => 
        scholarship.country === country
      );
    }
    
    if (type && type !== 'all') {
      filteredScholarships = filteredScholarships.filter(scholarship => 
        scholarship.type === type
      );
    }
    
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredScholarships = filteredScholarships.filter(scholarship =>
        scholarship.title.toLowerCase().includes(searchTerm) ||
        scholarship.description.toLowerCase().includes(searchTerm) ||
        scholarship.eligibility.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json({
      success: true,
      data: filteredScholarships,
      total: filteredScholarships.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scholarships',
      error: error.message
    });
  }
});

// GET single scholarship
router.get('/scholarships/:id', (req, res) => {
  try {
    const { id } = req.params;
    const scholarship = scholarships.find(s => s.id === parseInt(id) && s.active);
    
    if (!scholarship) {
      return res.status(404).json({
        success: false,
        message: 'Scholarship not found'
      });
    }
    
    res.json({
      success: true,
      data: scholarship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching scholarship',
      error: error.message
    });
  }
});

// GET resources statistics
router.get('/stats', (req, res) => {
  try {
    const activeDiscounts = studentDiscounts.filter(d => d.active);
    const activeScholarships = scholarships.filter(s => s.active);
    
    const totalUpvotes = activeDiscounts.reduce((sum, discount) => sum + discount.upvotes, 0);
    const popularDiscounts = activeDiscounts.filter(d => d.isPopular).length;
    const internationalScholarships = activeScholarships.filter(s => s.type === 'International').length;
    
    res.json({
      success: true,
      data: {
        studentDiscounts: {
          total: activeDiscounts.length,
          popular: popularDiscounts,
          totalUpvotes,
          categories: [...new Set(activeDiscounts.map(d => d.category))]
        },
        scholarships: {
          total: activeScholarships.length,
          international: internationalScholarships,
          national: activeScholarships.length - internationalScholarships,
          countries: [...new Set(activeScholarships.map(s => s.country))]
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
});

// Admin routes for managing resources
router.post('/admin/student-discounts', (req, res) => {
  try {
    const newDiscount = {
      id: Math.max(...studentDiscounts.map(d => d.id)) + 1,
      ...req.body,
      verified: new Date().toISOString().split('T')[0],
      upvotes: 0,
      active: true
    };
    
    studentDiscounts.push(newDiscount);
    
    res.status(201).json({
      success: true,
      message: 'Student discount created successfully',
      data: newDiscount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating student discount',
      error: error.message
    });
  }
});

router.post('/admin/scholarships', (req, res) => {
  try {
    const newScholarship = {
      id: Math.max(...scholarships.map(s => s.id)) + 1,
      ...req.body,
      active: true
    };
    
    scholarships.push(newScholarship);
    
    res.status(201).json({
      success: true,
      message: 'Scholarship created successfully',
      data: newScholarship
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating scholarship',
      error: error.message
    });
  }
});

module.exports = router;
