import React, { useState, useEffect } from "react";
import CardRecomendadas from "../CardRecomendadas/CardRecomendadas";
import "./ApiReceitasRecomendadas.css"

const ApiReceitasRecomendada = () => {
  const [random, setRandom] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const result = await response.json();
        setRandom(result.meals);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div className="apiReceitas">Carregando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const meal = random[0];

  return (
    <CardRecomendadas meal={meal} />
  );
};

export default React.memo(ApiReceitasRecomendada);
