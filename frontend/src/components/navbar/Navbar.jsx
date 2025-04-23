
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../../src/assets/logo.jpg';
import { FiSearch, FiMapPin } from 'react-icons/fi';
import { BiUserVoice } from "react-icons/bi";

const Navbar = ({ onCreateClick, onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([0, 700000]);

  
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        search,
        location,
        jobType,
        salaryRange,
      });
    }
  }, [search, location, jobType, salaryRange]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Find Jobs</li>
          <li>Find Talents</li>
          <li>About Us</li>
          <li>Testimonials</li>
        </ul>
        <button className="create" onClick={onCreateClick}>
          Create Jobs
        </button>
      </nav>

      <div className="filters-container">
        <div className="filters">
          <div className="input-icon">
            <FiSearch className="icon" />
            <input
              type="text"
              placeholder="Search By Job Title, Role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="input-icon">
            <FiMapPin className="icon" />
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Cuddalore">Cuddalore</option>
              <option value="Villupuram">Villupuram</option>
              <option value="Pondicherry">Pondicherry</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
            </select>
          </div>

          <div className="input-icon">
            <BiUserVoice className="icon"/>
            <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Job Type</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="FullTime">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

         
          <div className="salary-range">
            <div className="salary-label-row">
              <label>Salary Per Month</label>
              <span className="span">
                ₹{(salaryRange[0] / 1000).toFixed(0)}k - ₹
                {(salaryRange[1] / 1000).toFixed(0)}k
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="700000"
              value={salaryRange[1]}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setSalaryRange([0, value]);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
