import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import './styles.css';

function Header() {
  const history = useHistory();

  const handleLogOut = useCallback(() => {
    history.replace('/');
  }, [history]);

  return (
    <header className="header-container">
      <img src={logo} alt="Focadex" id="logo" />
      <div>
        <button type="button" id="profile-icon" className="icon-link">
          <FiUser />
        </button>
        <button type="button" className="icon-link" onClick={handleLogOut}>
          <FiLogOut />
        </button>
      </div>
    </header>
  );
}

export default Header;
