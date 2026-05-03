const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const {
  getDashboard,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getResults,
  addResult,
  updateResult,
  deleteResult,
  getSubjects,
  addSubject,
} = require('../controllers/adminController');

router.use(auth);
router.use(adminAuth);

router.get('/dashboard', getDashboard);

router.get('/students', getStudents);
router.post('/students', addStudent);
router.put('/students/:id', updateStudent);
router.delete('/students/:id', deleteStudent);

router.get('/results', getResults);
router.post('/results', addResult);
router.put('/results/:id', updateResult);
router.delete('/results/:id', deleteResult);

router.get('/subjects', getSubjects);
router.post('/subjects', addSubject);

module.exports = router;