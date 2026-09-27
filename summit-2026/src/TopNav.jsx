import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './TopNav.css';

const TopNav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="top-nav-bar">
      <div className="top-nav-wrap">
        <Link to="/" className="top-nav-brand">Thyroid Intervention Summit <span>2026</span></Link>
        <Link to="/" className={`top-nav-lnk ${path === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/program" className={`top-nav-lnk ${path === '/program' ? 'active' : ''}`}>Scientific Program</Link>
        <Link to="/register" className="top-nav-cta">Register</Link>
      </div>
    </nav>
  );
};

export default TopNav;
