import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/img/logo-pimenta.png";
import Button from "../Button/Button";
import "./Header.css";
import Input from "../Input/Input";
import { useAuth } from '../../hooks/useAuth';
import Modal from '../Modal/Modal';
import MenuMobile from '../MenuMobile/MenuMobile';

function Header({ onSearch }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleFavoritesClick = (e) => {
    if (!user) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <nav>
          <Input onSearch={onSearch} />
          <ul className="links">
            <li>
              <Link className="link" to="/">HOME</Link>
            </li>
            <li>
              <Link className="link" to="/favorites" onClick={handleFavoritesClick}>FAVORITAS</Link>
            </li>
            <li>
              <Link className="link" to="/signup">CADASTRAR</Link>
            </li>
            {user ? (
              <li>
                <Button text="SAIR" onClick={handleLogout} />
              </li>
            ) : (
              <li>
                <Link className="linkButton" to="/login">ENTRAR</Link>
              </li>
            )}
          </ul>
          <button className="mobile-menu-hamburguer" onClick={toggleMobileMenu}>
            &#9776;
          </button>
        </nav>
        {showModal && (
          <Modal onClose={handleCloseModal}>
            <p>Você precisa estar logado para acessar os favoritos. Deseja fazer login?</p>
            <div className="buttons">
              <button onClick={handleLoginRedirect}>Sim</button>
              <button onClick={handleCloseModal}>Não</button>
            </div>
          </Modal>
        )}
        {showMobileMenu && (
          <MenuMobile
            onClose={toggleMobileMenu}
            user={user}
            handleLogout={handleLogout}
            handleFavoritesClick={handleFavoritesClick}
            onSearch={onSearch}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
