const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// Create enrollment
router.post('/', async (req, res) => {
  try {
    const { course: courseId, studentName, studentEmail } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ success: false, message: 'Course not found' });

    const enrolledCount = await Enrollment.countDocuments({ course: courseId });
    if (course.seats && enrolledCount >= course.seats) {
      return res.status(400).json({ success: false, message: 'No seats available' });
    }

    const enrollment = new Enrollment({ course: courseId, studentName, studentEmail });
    const saved = await enrollment.save();

    res.status(201).json({ success: true, data: saved });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'You are already enrolled in this course' });
    }
    res.status(400).json({ success: false, message: err.message });
  }
});

// Get all enrollments
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.course) filter.course = req.query.course;
    const enrollments = await Enrollment.find(filter).populate('course').sort({ enrolledAt: -1 });
    res.json({ success: true, data: enrollments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete enrollment
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Enrollment.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ success: false, message: 'Enrollment not found' });
    res.json({ success: true, data: removed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
