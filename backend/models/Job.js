const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  companyName: { type: String, required: true },
  companyLogo: { type: String, required: true }, 
  location: { type: String, required: true },
  salaryRange: { type: String, required: true },
  jobType: { type: String, required: true },
  description: { type: [String], required: true },
  applicationDeadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }, 
  applyLink: { type: String, required: true } 
});

module.exports = mongoose.model('Jobs', jobSchema);
