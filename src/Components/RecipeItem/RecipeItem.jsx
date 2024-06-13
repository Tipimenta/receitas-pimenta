import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import "./RecipeItem.css";

const RecipeItem = ({ recipe, onClick }) => {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user && user.favorites.some(fav => fav.idMeal === recipe.idMeal);

  return (
    <li className="cardRecipeItem" onClick={() => onClick(recipe)}>
      <h2>{recipe.strMeal}</h2>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      <button onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(recipe);
      }}>
        {isFavorite ? 'Remover' : 'Favoritar'}
      </button>
    </li>
  );
};

export default RecipeItem;
