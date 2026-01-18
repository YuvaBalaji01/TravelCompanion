import React, { useState } from 'react';
import './index.css'; // We will create this file next

const TravelUI = () => {
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: ''
  });

  return (
    <div className="hero-container">
      {/* Background Overlay */}
      <div className="hero-overlay"></div>

      <div className="content-wrapper">
        <div className="header-section">
          <h1>Explore the World</h1>
          <p>Plan your next adventure with a group</p>
        </div>

        <div className="search-card">
          <div className="input-group">
            <label>Destination</label>
            <input 
              type="text" 
              placeholder="Where are you going?" 
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>Start Date</label>
            <input 
              type="date" 
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>

          <div className="input-group">
            <label>End Date</label>
            <input 
              type="date" 
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            />
          </div>

          <button className="search-btn">
            Search Travel Companion
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelUI;