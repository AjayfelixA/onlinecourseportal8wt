const express = require('express');
const router = express.Router();
const Course = require('../config/models/Course');

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ success: true, data: courses });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST - Add a new course
router.post('/', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ success: true, data: course });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
