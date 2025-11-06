const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true, lowercase: true },
  enrolledAt: { type: Date, default: Date.now }
});

enrollmentSchema.index({ course: 1, studentEmail: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
