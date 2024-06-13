import React, { useState, useEffect } from "react";

const ApiReceitasBuscaLetra = () => {
  const [buscas, setBusca] = useState([]);
  const [error, setError] = useState(null);
  const [letras, setLetra] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (letras) {
        try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letras}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const result = await response.json();
          setBusca(result.meals || []); // Ensure `buscas` is an empty array if no meals are found
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
        } finally {
          // Any final cleanup or actions can go here
          console.log("Fetch attempt finished");
        }
      }
    };

    fetchData();
  }, [letras]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>BUSCA LETRA</h1>
      <input
        type="text"
        value={letras}
        onChange={(event) => setLetra(event.target.value)}
        placeholder="Digite uma letra"
      />
      <div className="categories-container">
        {buscas.length > 0 ? (
          buscas.map(busca => (
            <div key={busca.idMeal} className="category">
              <h2>{busca.strMeal}</h2>
              <img src={busca.strMealThumb} alt={busca.strMeal} />
            </div>
          ))
        ) : (
          <p>No meals found.</p>
        )}
      </div>
    </div>
  );
};

export default ApiReceitasBuscaLetra;
