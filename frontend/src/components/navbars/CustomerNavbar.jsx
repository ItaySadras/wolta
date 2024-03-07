import React from 'react';
import './navbar.css'; // Make sure to import the CSS file correctly

const CustomerNavbar = () => {
  return (
    <nav className="customer-navbar">
      <div className="logo-container">
        <img src="" alt="BaliFood Logo" className="navbar-logo" />
        <div className="brand-name">
          <h1>BaliFood</h1>
        </div>
      </div>
      <div className="profile-section">
        profile
      </div>
      <div className="greeting-section">
        <h1>Hi! {/* name of user */}</h1>
      </div>
      <div className="logout-section">
        <button className="logout-button">Logout</button>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
