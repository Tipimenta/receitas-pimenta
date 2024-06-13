import React, { useState, useEffect } from 'react';
import './Input.css';
import { useDebounce } from '../../hooks/useDebounce'; // Importe o hook personalizado

function Input({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1200);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  return (
    <input
      name="search"
      type="text"
      placeholder="Buscar sua receita aqui..."
      className="search-input"
      value={searchTerm}
      onChange={handleChange}
    />
  );
}

export default Input;
