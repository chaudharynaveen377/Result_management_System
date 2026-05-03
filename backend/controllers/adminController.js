const User = require('../models/User');
const Result = require('../models/Result');
const Subject = require('../models/Subject');

// Get dashboard analytics
exports.getDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalSubjects = await Subject.countDocuments();
    const totalResults = await Result.countDocuments();

    const averageScore = await Result.aggregate([
      { $group: { _id: null, avgMarks: { $avg: '$marks' } } }
    ]);

    res.json({
      totalStudents,
      totalSubjects,
      totalResults,
      averageScore: averageScore[0]?.avgMarks || 0,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Student management
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addStudent = async (req, res) => {
  const { name, email, rollNumber, course, semester } = req.body;

  try {
    const student = new User({
      name,
      email,
      password: 'defaultpassword', // Should be changed later
      role: 'student',
      rollNumber,
      course,
      semester,
    });

    await student.save();
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const student = await User.findByIdAndUpdate(id, updates, { new: true });
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Result management
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find().populate('student', 'name rollNumber').populate('subject', 'name code');
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addResult = async (req, res) => {
  const { studentId, subjectId, marks, grade, semester, year } = req.body;

  try {
    const result = new Result({
      student: studentId,
      subject: subjectId,
      marks,
      grade,
      semester,
      year,
    });

    await result.save();
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateResult = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await Result.findByIdAndUpdate(id, updates, { new: true });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteResult = async (req, res) => {
  const { id } = req.params;

  try {
    await Result.findByIdAndDelete(id);
    res.json({ message: 'Result deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Subject management
exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addSubject = async (req, res) => {
  const { name, code, credits, course } = req.body;

  try {
    const subject = new Subject({
      name,
      code,
      credits,
      course,
    });

    await subject.save();
    res.json(subject);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};