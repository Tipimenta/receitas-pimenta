import React, { useState, useEffect } from "react";
import CardCategorias from "../CardCategorias/CardCategorias";

const ApiReceitasCategorias = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setCategories(result.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        console.log("Fetch attempt finished");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <CardCategorias categories={categories} />;
};

export default ApiReceitasCategorias;
