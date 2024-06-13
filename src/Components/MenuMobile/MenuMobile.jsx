import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MenuMobile.css';
import Input from '../Input/Input';

const MenuMobile = ({ onClose, user, handleLogout, handleFavoritesClick, onSearch }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="mobile-menu-overlay">
      <div className="mobile-menu" ref={menuRef}>
        <button className="close-mobile" onClick={onClose}>&times;</button>
        <ul className="mobile-links">
          <li>
            <Input onSearch={onSearch} />
          </li>
          <li>
            <Link className="link" to="/" onClick={onClose}>HOME</Link>
          </li>
          <li>
            <Link className="link" to="/favorites" onClick={(e) => { handleFavoritesClick(e); onClose(); }}>FAVORITAS</Link>
          </li>
          <li>
            <Link className="link" to="/signup" onClick={onClose}>CADASTRAR</Link>
          </li>
          {user ? (
            <li>
              <button className="Btn-primary" onClick={() => { handleLogout(); onClose(); }}>SAIR</button>
            </li>
          ) : (
            <li>
              <Link className="linkButton" to="/login" onClick={onClose}>ENTRAR</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MenuMobile;
