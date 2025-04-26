// import React, { useState } from 'react';
// import axios from 'axios';
// import './style.css';

// const CreateJob = ({ onClose, refreshJobs }) => {
//   const [formData, setFormData] = useState({
//     jobTitle: '',
//     companyName: '',
//     location: '',
//     salaryRange: '',
//     jobType: 'FullTime',
//     applicationDeadline: '',
//     description: '',
//     companyLogo: '',       
//     applyLink: '',   
    
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     await axios.post('/api/jobs', formData);
//   //     refreshJobs();
//   //     // onClose();
//   //   } catch (err) {
//   //     console.error('Error creating job:', err);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const jobData = {
//       ...formData,
//       description: formData.description
//         .split('\n')                  // Split by new lines
//         .map((line) => line.trim())   // Trim whitespace
//         .filter((line) => line !== ''), // Remove empty lines
//     };
  
//     try {
//       await axios.post('https://jobportal-qzyk.onrender.com/api/jobs', jobData);
//       refreshJobs();
//       onClose();
//     } catch (err) {
//       console.error('Error creating job:', err);
//     }
//   };
  
//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <h2>Create Job Opening</h2>
//         <form onSubmit={handleSubmit}>
//           <div className='formrow'>

//           <div>
//           <label htmlFor="jobTitle">Job Title</label>
//           <div className="row">
            
//             <input
//               type="text"
//               name="jobTitle"
//               placeholder="Job Title"
//               value={formData.jobTitle}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <label htmlFor="location">Location</label>
//           <div className="row">
//           <select
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//             >
//               <option value="">Preferred Location</option>
//               <option value="Chennai">Chennai</option>
//               <option value="Coimbatore">Coimbatore</option>
//               <option value="Cuddalore">Cuddalore</option>
//               <option value="Villupuram">Villupuram</option>
//               <option value="Pondicherry">Pondicherry</option>
//               <option value="Bangalore">Bangalore</option>
//               <option value="Mumbai">Mumbai</option>
              
//             </select>
//             </div>
//             <label htmlFor="salaryRange">Salary Range</label>
//             <div className="row">
//             <input
//               type="text"
//               name="salaryRange"
//               placeholder="Salary Range (e.g. 10LPA)"
//               value={formData.salaryRange}
//               onChange={handleChange}
//               required
//             />
//             </div>
//           </div>

//           <div>
//           <label htmlFor="companyName">Company Name</label>
//           <div className='row'>

//             <input
//               type="text"
//               name="companyName"
//               placeholder="Company Name"
//               value={formData.companyName}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <label htmlFor="jobType">Job Type</label>
//           <div className='row'>
//           <select
//               name="jobType"
//               value={formData.jobType}
//               onChange={handleChange}
//             >
//               <option value="FullTime">Full Time</option>
//               <option value="PartTime">Part Time</option>
//               <option value="Internship">Internship</option>
//             </select>
//           </div>
//           <label htmlFor="applicationDeadline">Application Deadline</label>
//           <div className='row'>
//           <input
//               type="date"
//               name="applicationDeadline"
//               value={formData.applicationDeadline}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           </div>

//           </div>
// <label htmlFor="description">Job Description</label>
//           <textarea
//             name="description"
//             placeholder="Job Description"
//             rows="4"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>


//           <div className="button-group">
//             <button type="button" className="cancel" onClick={onClose}>
//               Cancel
//             </button>
//             <button type="submit" className="publish">
//               Publish
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateJob;




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
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
              <option value="Remote">Remote</option>
            </select>
  </div>

  <div className="input-row">
    <input name="salaryRange" placeholder="Salary Range (e.g. ₹50000 - ₹70000)" required onChange={handleChange} />
    <select name="jobType" required onChange={handleChange}>
              <option value="">Select Job Type</option>
              <option value="Remote">Remote</option>
              <option value="Onsite">Onsite</option>
              <option value="Hybrid">Hybrid</option>
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

