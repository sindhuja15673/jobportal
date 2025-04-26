import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../../redux/slice/JobSlice';
import { HiOutlineUserPlus } from "react-icons/hi2";
import { SiOnlyoffice } from "react-icons/si";
import { RiBuildingLine } from "react-icons/ri";
import './style.css';


const convertSalaryToK = (salary) => {
  // Check if the salary is in "LPA" format
  if (salary.toLowerCase().includes("lpa")) {
    const salaryInLPA = parseFloat(salary.replace(/[^\d.]/g, '')); 
    return salaryInLPA * 100; 
  }

  if (salary.toLowerCase().includes("k")) {
    return parseFloat(salary.replace(/[^\d.]/g, ''));
  }
  return 0; 
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
    const { search, location, jobType, salaryRange } = filters;

    const searchMatch = search
      ? job.jobTitle.toLowerCase().includes(search.toLowerCase())
      : true;

    const locationMatch = location
      ? job.location.toLowerCase().includes(location.toLowerCase().trim())
      : true;

    const jobTypeMatch = jobType
      ? job.jobType.toLowerCase().includes(jobType.toLowerCase())
      : true;

    const convertedJobSalary = convertSalaryToK(job.salaryRange);

    const salaryMatch = salaryRange
      ? convertedJobSalary >= salaryRange[0] && convertedJobSalary <= salaryRange[1]
      : true;

    return searchMatch && locationMatch && jobTypeMatch && salaryMatch;
  });

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
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="company-logo"
                    />
                  ) : (
                    <span>{job.companyName?.charAt(0) || '?'}</span>
                  )}
                </div>
                <span className="time">24h Ago</span>
              </div>

              <div className="job-title">{job.jobTitle}</div>
              <div className="job-info">
                <span><HiOutlineUserPlus style={{ fontSize: "16px" }} /> {job.experience}</span>
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
                <button className='apply'>Apply Now</button>
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
