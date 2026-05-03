const User = require('../models/User');
const Result = require('../models/Result');

// Get student profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user.userId).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get student results
exports.getResults = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id || req.user.userId })
      .populate('subject', 'name code credits')
      .sort({ year: -1, semester: -1 });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get performance analytics
exports.getAnalytics = async (req, res) => {
  try {
    const results = await Result.find({ student: req.user.id || req.user.userId });

    const totalSubjects = results.length;
    const averageMarks = results.reduce((sum, result) => sum + result.marks, 0) / totalSubjects;
    const highestMarks = Math.max(...results.map(r => r.marks));
    const lowestMarks = Math.min(...results.map(r => r.marks));

    const gradeDistribution = results.reduce((acc, result) => {
      acc[result.grade] = (acc[result.grade] || 0) + 1;
      return acc;
    }, {});

    res.json({
      totalSubjects,
      averageMarks,
      highestMarks,
      lowestMarks,
      gradeDistribution,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};