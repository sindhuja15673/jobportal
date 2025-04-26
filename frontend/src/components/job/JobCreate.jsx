import React, { useState } from 'react';
import axios from 'axios';
import './create.css';

const CreateJob = ({ onClose, refreshJobs }) => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    companyLogo: '',
    location: '',
    salaryRange: '',
    jobType: '',
    experience: '',
    description: '',
    applicationDeadline: '',
    applyLink: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jobportal-qzyk.onrender.com/api/jobs', {
        ...formData,
        description: formData.description.split('\n').filter(Boolean), 
      });
      if (refreshJobs) refreshJobs();
      onClose();
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className='modal-container'>

        <h2>Create Job Opening</h2>
      
      <form onSubmit={handleSubmit} className="create-job-form">
  <div className="input-row">
    <input name="jobTitle" placeholder="Job Title" required onChange={handleChange} />
    <input name="companyName" placeholder="Company Name" required onChange={handleChange} />
  </div>

  <div className="input-row">
    <input name="companyLogo" placeholder="Company Logo URL" required onChange={handleChange} />
    <select name="location" required onChange={handleChange}>
              <option value="">Select Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Cuddalore">Cuddalore</option>
              <option value="Villupuram">Villupuram</option>
              <option value="Pondicherry">Pondicherry</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
            </select>
  </div>

  <div className="input-row">
    <input name="salaryRange" placeholder="Salary Range (e.g. ₹50000 - ₹70000)" required onChange={handleChange} />
    <select name="jobType" required onChange={handleChange}>
              <option value="">Select Job Type</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="FullTime">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Intern">Intern</option>
            </select>
  </div>

  <div className="input-row">
    <input name="experience" placeholder="Experience Required (e.g. 2 years)" required onChange={handleChange} />
    <input name="applyLink" placeholder="Apply Link" required onChange={handleChange} />
  </div>

  <input name="applicationDeadline" type="date" required onChange={handleChange} />

  <textarea name="description" placeholder="Job Description (one point per line)" required onChange={handleChange} />

  <div className="form-actions">
    <button type="button" onClick={onClose}>Cancel</button>
    <button type="submit">Post Job</button>
  </div>
</form>

      </div>
    </div>
  );
};

export default CreateJob;

