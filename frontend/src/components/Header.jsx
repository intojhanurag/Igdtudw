import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 
import Sage from '../images/Sage.png';
import './Header.css';

function Header({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/chatbox" className="logo-link">
            <img 
              src={Sage} 
              alt="Sage-Career mentor bot" 
              className="logo"
            />
          </Link>
          <Link to='/' className="title">Calore</Link>
        </div>
        
        <div className="nav-right">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
          
          <div className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-links">
              <li>
                <Link to="/home" onClick={closeMenu}>Home</Link>
              </li>
              <li className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <span className="dropdown-title">Resources</span>
                <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                  <li>
                    <Link to="/userinput" onClick={closeMenu}>User Input</Link>
                  </li>
                  <li>
                    <Link to="/find-meditation-center" onClick={closeMenu}>Find Meditation Center</Link>
                  </li>
                  <li>
                    <Link to="/articles" onClick={closeMenu}>Articles</Link>
                  </li>
                </ul>

              </li>
              <li>
                  <Link to="/roadmap" onClick={closeMenu}>Nutrimap</Link> {/* Ensure Nutrimap is included */}
              </li>

              
              <li className="theme-toggle-item">
                <button onClick={toggleTheme} className="theme-toggle">
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
              </li>
              <li>
                <FaUser
                  className="user-profile-icon"
                  onClick={handleProfileClick}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;