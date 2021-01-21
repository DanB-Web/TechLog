import React from 'react';

import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = ({admin, logout, mode, authorised, toggleMode}) => {


  return (
    <nav className="navbar__container">
      <div className="navbar__banner">
        <i className="fas fa-cogs fa-3x"></i>
        <h1 className="navbar__title">TechLog</h1>
      </div>
  
      {authorised && 
        <div className="navbar__links">
            <Link to='/search'>Search</Link>
            <Link to='/new'>New</Link>
            {admin ? <Link to='/edit'>Edit</Link> : null}
            <Link to="/logout" onClick={logout}>Logout</Link>
            <div className="mode__div">
              {mode === 'light' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
              <button className="navbar__mode-switch" onClick={toggleMode}>X</button>
            </div>
          </div>}
      
    </nav>
  )
}

export default Navbar;