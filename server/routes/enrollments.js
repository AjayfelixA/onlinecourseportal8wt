const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');


// GET all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('course');
    res.json({ success: true, data: enrollments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST - Add new enrollment
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body);
    await enrollment.save();
    res.json({ success: true, data: enrollment });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
