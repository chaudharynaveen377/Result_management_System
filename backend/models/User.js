const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'student'],
    required: true,
  },
  rollNumber: {
    type: String,
    required: function() {
      return this.role === 'student';
    },
  },
  course: {
    type: String,
    required: function() {
      return this.role === 'student';
    },
  },
  semester: {
    type: Number,
    required: function() {
      return this.role === 'student';
    },
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);