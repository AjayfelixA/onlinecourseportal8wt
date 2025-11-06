const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  instructor: [{ type: String, trim: true }], // ⬅ multiple instructors
  seats: { type: Number, default: 50, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
