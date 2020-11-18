import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import './styles.css';

function Header() {
  return (
    <header className="header-container">
      <img src={logo} alt="Focadex" id="logo" />
      <div>
        <button type="button" id="profile-icon" className="icon-link">
          <FiUser />
        </button>
        <Link to="/" className="icon-link">
          <FiLogOut />
        </Link>
      </div>
    </header>
  );
}

export default Header;
