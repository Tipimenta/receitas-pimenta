import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./CardCategorias.css";

const CardCategorias = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.strCategory}`);
  };

  return (
    <>
      {categories.slice(0, -2).map((category) => (
        <li key={category.idCategory} className="cardCategorias" onClick={() => handleCategoryClick(category)}>
          <img  src={category.strCategoryThumb} alt={category.strCategory} />
          <h2>{category.strCategory}</h2>
        </li>
      ))}
    </>
  );
};

export default CardCategorias;