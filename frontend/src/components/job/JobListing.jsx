import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slice/JobSlice';
import { FiMapPin } from 'react-icons/fi';
import { BiUserPlus} from 'react-icons/bi';
import { SiOnlyoffice } from "react-icons/si";
import { RiBuildingLine } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa6";
import { HiOutlineUserPlus } from "react-icons/hi2";

import './style.css';

const getColorFromName = (name) => {
  const colors = [
    "#ff6f61", "#6a67ce", "#1e88e5", "#00bfa5", "#f9a825",
    "#ab47bc", "#ef5350", "#26c6da", "#5c6bc0", "#43a047"
  ];
  const index = name
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
};

const JobListing = ({ filters }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs.jobs);
  const jobStatus = useSelector((state) => state.jobs.status);

  useEffect(() => {
    if (jobStatus === 'idle') {
      dispatch(fetchJobs());
    }
  }, [jobStatus, dispatch]);

  const filteredJobs = jobs.filter((job) => {
    const { search, location, jobType, salary } = filters;

    const searchMatch = search
      ? job.jobTitle.toLowerCase().includes(search.toLowerCase())
      : true;
      
      const locationMatch = location
      ? job.location.toLowerCase().includes(location.toLowerCase().trim())
      : true;
    const jobTypeMatch = jobType
      ? job.jobType.toLowerCase().includes(jobType.toLowerCase())
      : true;

      const cleanSalary = job.salaryRange.replace(/[₹,]/g, '');
const salaryNumbers = cleanSalary.match(/\d+/g)?.map(Number);

const averageSalary = salaryNumbers
  ? salaryNumbers.reduce((a, b) => a + b, 0) / salaryNumbers.length
  : null;

const salaryMatch = salary
  ? averageSalary !== null &&
    averageSalary >= salary[0] &&
    averageSalary <= salary[1]
  : true;

    return searchMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

  return (
    <div className="job-listings-container">
      <div className="job-listings">
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <div
                  className="logo-circle"
                  style={{ backgroundColor: getColorFromName(job.companyName || '?') }}
                >
                  {job.companyLogo ? (
                    <img src={job.companyLogo} alt={job.companyName} />
                  ) : (
                    job.companyName?.charAt(0) || '?'
                  )}
                </div>
                <span className="time">24h Ago</span>
              </div>

              <div className="job-title">{job.jobTitle}</div>
              <div className="job-info">
                <span><HiOutlineUserPlus style={{fontSize:"16px"}}/> {job.experience}</span>
                <span><RiBuildingLine /> {job.jobType}</span>
                <span><SiOnlyoffice /> {job.salaryRange}</span>
                
              </div>
              <div className="job-description">
              
              <ul>
  {Array.isArray(job.description) ? (
    job.description.map((desc, index) => (
      <li key={index}>{desc}</li>  
    ))
  ) : (
    <li>{job.description}</li>    
  )}
</ul>

              </div>
              <div className="apply-link">
                <button className='apply'> Apply Now</button>
              </div>
            </div>
          ))}
          {filteredJobs.length === 0 && <p>No matching jobs found.</p>}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
