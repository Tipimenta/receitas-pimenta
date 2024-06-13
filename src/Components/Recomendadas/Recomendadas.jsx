import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CardRecomendadas from "../CardRecomendadas/CardRecomendadas";
import "./Recomendadas.css";
import Tags from "../Tags/Tags";
import Modal from "../Modal/Modal";

const Recomendadas = () => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = Array.from({ length: 10 }, () =>
          axios
            .get("https://www.themealdb.com/api/json/v1/1/random.php")
            .then((response) => response.data.meals[0])
        );
        const results = await Promise.all(promises);
        setMeals(results);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = useCallback((meal) => {
    setSelectedMeal(meal);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedMeal(null);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="recomendadas">
      <Tags legenda="Recomendadas" />
      <ul className="conteudo-recomendadas">
        {meals.map((meal, index) => (
          <CardRecomendadas key={index} meal={meal} onClick={handleCardClick} />
        ))}
      </ul>
      {selectedMeal && (
        <Modal onClose={handleCloseModal}>
          <h2>{selectedMeal.strMeal}</h2>
          <div className="receita">
          
            <div className="conteudo">
              
              <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
              <h3>Ingredients:</h3>
              <ul>
                {Object.keys(selectedMeal).map((key) => {
                  if (key.startsWith("strIngredient") && selectedMeal[key]) {
                    const ingredientNumber = key.replace("strIngredient", "");
                    const measureKey = `strMeasure${ingredientNumber}`;
                    return (
                      <li key={key}>
                        {selectedMeal[key]} - {selectedMeal[measureKey]}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className="preparo">
            <h3>Way of preparing</h3>
            <p>{selectedMeal.strInstructions}</p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Recomendadas;
