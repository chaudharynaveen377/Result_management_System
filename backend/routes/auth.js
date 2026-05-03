const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', [
  body('name', 'Name is required').not().isEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('role', 'Role is required').isIn(['admin', 'student']),
], signup);

router.post('/login', [
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
], login);

module.exports = router;