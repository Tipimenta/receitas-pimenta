import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import RecipeItem from '../../Components/RecipeItem/RecipeItem';
import Tags from '../../Components/Tags/Tags';
import Modal from '../../Components/Modal/Modal';
import ApiReceitasNome from "../../Components/ApiReceitas/ApiReceitasNome"
import "./FavoritesPage.css";
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';


const FavoritesPage = () => {
  const { user } = useAuth();
  const favorites = user ? user.favorites : [];
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleRecipeClick = (recipe) => {
    console.log(recipe);
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  return (
    <>

      <Header onSearch={handleSearch} />

      {searchTerm ? (
        <ApiReceitasNome searchTerm={searchTerm} />
      ) : (
        <>
          <div className="favoritas">
            <Tags legenda="Favoritas" />
            {favorites.length > 0 ? (
              <ul className='conteudo-favoritas'>
                {favorites.map((recipe) => (
                  <RecipeItem key={recipe.idMeal} recipe={recipe} onClick={() => handleRecipeClick(recipe)} />
                ))}
              </ul>
            ) : (
              <p className='sem-favoritos'>Sem favoritas no momento!</p>
            )}
            {showModal && selectedRecipe && (
              <Modal onClose={handleCloseModal}>
                <h2>{selectedRecipe.strMeal}</h2>
                <div className="receita">
                  <div className="conteudo">
                    <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
                    <h3>Ingredientes:</h3>
                    <ul>
                      {Object.keys(selectedRecipe).map((key) => {
                        if (key.startsWith("strIngredient") && selectedRecipe[key]) {
                          const ingredientNumber = key.replace("strIngredient", "");
                          const measureKey = `strMeasure${ingredientNumber}`;
                          return (
                            <li key={key}>
                              {selectedRecipe[key]} - {selectedRecipe[measureKey]}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                  <div className="preparo">
                    <h3>Modo de preparo</h3>
                    <p>{selectedRecipe.strInstructions}</p>
                  </div>
                </div>
              </Modal>
            )}
          </div>
        </>
      )}
      <Footer />
    </>
  );
};

export default FavoritesPage;
