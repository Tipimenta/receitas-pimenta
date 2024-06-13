import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import "./CardRecomendadas.css";

function CardRecomendadas({ meal, onClick }) {
  const { user, toggleFavorite } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsFavorite(user.favorites.some(fav => fav.idMeal === meal.idMeal));
    }
  }, [user, meal.idMeal]);

  const handleToggleFavorite = useCallback(() => {
    if (user) {
      toggleFavorite(meal);
    } else {
      setShowModal(true);
    }
  }, [toggleFavorite, meal, user]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <>
      <li className="cardRecomendadas" key={meal.idMeal} onClick={() => onClick(meal)}>
        <h2>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <button onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite();
        }}>
          {isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
        </button>
      </li>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Você precisa estar logado para adicionar aos favoritos. Deseja fazer login?</p>
            <div className="buttons">
              <button onClick={handleLoginRedirect}>Sim</button>
              <button onClick={handleCloseModal}>Não</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CardRecomendadas;