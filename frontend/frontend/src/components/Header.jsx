import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { assets } from '../assets/assets.js';
import { logoutUser } from '../api/authApis.js';

const Header = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-nav">
        <button onClick={() => navigate(-1)}>
          <img src={assets.arrow_left} alt="Back" />
        </button>
        <button onClick={() => navigate(1)}>
          <img src={assets.arrow_right} alt="Forward" />
        </button>
      </div>
      <div className="header-user">
        {user ? (
          <div className="user-profile-container">
            <div className="user-profile" onClick={toggleMenu}>
              <span>{user.email.charAt(0).toUpperCase()}</span>
            </div>
            {isMenuOpen && (
              <div className="profile-dropdown">
                <p className="profile-email">{profile?.username || user.email}</p>
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <div className="user-actions">
            <Link to="/signup" className="signup-btn">Sign Up</Link>
            <Link to="/login" className="login-btn">Log In</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;