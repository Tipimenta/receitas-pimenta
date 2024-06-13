import React, { useState, useEffect } from 'react';
import Modal from '../../Components/Modal/Modal';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce'; // Importe o hook personalizado

const ApiReceitasNome = ({ searchTerm }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Use debounce com um atraso de 500ms

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${debouncedSearchTerm}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.meals ? result.meals : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (debouncedSearchTerm) {
      fetchData();
    } else {
      setData(null);
    }
  }, [debouncedSearchTerm]);

  const handleOpenModal = async (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleToggleFavorite = (meal) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    toggleFavorite(meal);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
    setShowModal(false); // Fechar o modal de receita também
  };

  const handleModalClick = (e) => {
    if (e.target.className === 'modal') {
      handleCloseModal();
    }
  };

  const isMealFavorite = (meal) => {
    return user && user.favorites.some(favorite => favorite.idMeal === meal.idMeal);
  };

  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {data && data.length > 0 && (
        <div className="meal-list">
          {data.map((meal) => (
            <div key={meal.idMeal} className="meal-item" onClick={() => handleOpenModal(meal)}>
              <h2>{meal.strMeal}</h2>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
              <button onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(meal);
              }}>
                {isMealFavorite(meal) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
            </div>
          ))}
        </div>
      )}
      {data && data.length === 0 && (
        <div className='meal-list'>Nenhuma receita encontrada para o termo de pesquisa "{debouncedSearchTerm}"</div>
      )}
      {showModal && selectedRecipe && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="modal-content">
            <div className="receita">
              <div className="conteudo">
                <h2>{selectedRecipe.strMeal}</h2>
                <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />

                <h3>Ingredientes:</h3>
                <ul>
                  {getIngredients(selectedRecipe).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="preparo">
                <h3>Modo de Preparo:</h3>
                <p>{selectedRecipe.strInstructions}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {showLoginModal && (
        <div className="modal" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>&times;</button>
            <p>Você precisa estar logado para adicionar aos favoritos. Deseja fazer login?</p>
            <div className="buttons">
              <button onClick={handleLoginRedirect}>Sim</button>
              <button onClick={handleCloseModal}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiReceitasNome;
