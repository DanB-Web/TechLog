import * as React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

interface NavBarProps {
  admin: boolean;
  logout: () => void,
  mode: string,
  authorised: boolean,
  toggleMode: () => void
}

const Navbar: React.FC<NavBarProps> = ({admin, logout, mode, authorised, toggleMode}) => {
  return (
    <nav className="navbar__container">
      <div className="navbar__banner">
        <i className="fas fa-cogs fa-3x"></i>
        <h1 className="navbar__title">TechLog</h1>
      </div>

      {authorised &&
        <div className="navbar__links" >
          <Link to='/search' data-testid="search-button">Search</Link>
          <Link to='/new' data-testid="new-button">New</Link>
          <Link to="/logout" onClick={logout} data-testid="logout-button">Logout</Link>
          <div className="mode__div">
            {mode === 'light' ? <i className="fas fa-moon" data-testid='moon-icon'></i> : <i className="fas fa-sun" data-testid='sun-icon'></i>}
            <button className="navbar__mode-switch" onClick={toggleMode} data-testid='toggle-theme'>X</button>
          </div>
        </div>}
    </nav>
  )
}

export default Navbar;
