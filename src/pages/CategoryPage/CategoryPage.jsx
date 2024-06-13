import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Modal from '../../Components/Modal/Modal';
import { useAuth } from '../../hooks/useAuth';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import ApiReceitasNome from "../../Components/ApiReceitas/ApiReceitasNome"; // Importando o componente ApiReceitasNome
import "./CategoryPage.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { user, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleOpenModal = async (recipeId) => {
    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      setSelectedRecipe(data.meals[0]);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const getIngredients = (recipe) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && measure) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  const handleFavorite = async (recipeId) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      const recipe = data.meals[0];
      toggleFavorite(recipe);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        const data = await response.json();
        setRecipes(data.meals);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [categoryName]);

  return (
    <>
      <Header onSearch={handleSearch} />
      {searchTerm ? (
        <ApiReceitasNome searchTerm={searchTerm} />
      ) : (
        <div className="category-page">
          {error && <div>Error: {error}</div>}
          {recipes.map((recipe) => (
            <div key={recipe.idMeal} className="card">
              <h3>{recipe.strMeal}</h3>
              <img className="image" src={recipe.strMealThumb} alt={recipe.strMeal} />
              <button onClick={() => handleFavorite(recipe.idMeal)}>
                {user && user.favorites.some(fav => fav.idMeal === recipe.idMeal) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
              </button>
              <button onClick={() => handleOpenModal(recipe.idMeal)}>Ver Detalhes</button>
            </div>
          ))}
          {showModal && selectedRecipe && (
            <Modal onClose={handleCloseModal}>
              <h2>{selectedRecipe.strMeal}</h2>
              <div className="receita">
                <div className="conteudo">
                  <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
                  <h3>Ingredientes:</h3>
                  <ul>
                    {getIngredients(selectedRecipe).map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="preparo">
                  <h3>Modo de preparo:</h3>
                  <p>{selectedRecipe.strInstructions}</p>
                </div>
              </div>
            </Modal>
          )}
          {showLoginModal && (
            <div className="modal">
              <div className="modal-content">
                <p>Você precisa estar logado para adicionar aos favoritos. Deseja fazer login?</p>
                <div className="buttons">
                  <button onClick={handleLoginRedirect}>Sim</button>
                  <button onClick={() => setShowLoginModal(false)}>Não</button>
                </div>
              </div>
            </div>
          )}
          {loading && <div>Loading...</div>}
        </div>
      )}
      <Footer />
    </>
  );
};

export default CategoryPage;
