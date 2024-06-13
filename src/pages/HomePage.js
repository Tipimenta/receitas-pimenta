import React, { useState } from 'react';
import Banner from '../Components/Banner/Banner';
import ApiReceitasNome from "../Components/ApiReceitas/ApiReceitasNome"
import Categorias from "../Components/Categorias/Categorias"
import Recomendadas from "../Components/Recomendadas/Recomendadas"
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      {searchTerm ? (
        <ApiReceitasNome searchTerm={searchTerm} />
      ) : (
        <>
          <Banner />
          <Categorias />
          <Recomendadas />
        </>
      )}
      <Footer />
    </>
  );
};

export default HomePage;
