const express = require('express');
const router = express.Router();
const { auth, studentAuth } = require('../middleware/auth');
const {
  getProfile,
  getResults,
  getAnalytics,
} = require('../controllers/studentController');

router.use(auth);
router.use(studentAuth);

router.get('/profile', getProfile);
router.get('/results', getResults);
router.get('/analytics', getAnalytics);

module.exports = router;