const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  studentName: { type: String, required: true, trim: true },
  studentEmail: { type: String, required: true, trim: true, lowercase: true },
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

enrollmentSchema.index({ course: 1, studentEmail: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
