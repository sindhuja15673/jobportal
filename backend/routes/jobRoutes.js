const express = require('express');
const Job = require('../models/Job.js');

const router = express.Router();

router.post('/', async (req, res) => {
  const { jobTitle, companyName, companyLogo, location, salaryRange, jobType, description, applicationDeadline, applyLink } = req.body;

  const newJob = new Job({
    jobTitle,
    companyName,
    companyLogo, 
    location,
    salaryRange,
    jobType,
    description,
    applicationDeadline,
    applyLink 
  });

  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
