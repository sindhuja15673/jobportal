const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    jobTitle,
    companyName,
    companyLogo,
    location,
    salaryRange,
    jobType,
    experience,
    description,
    applicationDeadline,
    applyLink,
  } = req.body;

  const newJob = new Job({
    jobTitle,
    companyName,
    companyLogo,
    location,
    salaryRange,
    jobType,
    experience,
    description,
    applicationDeadline,
    applyLink,
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
