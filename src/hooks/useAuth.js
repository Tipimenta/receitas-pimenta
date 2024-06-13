import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      navigate('/'); 
    } else {
      alert('Dados incorretos. Por favor, tente novamente.');
    }
  };

  const logout = () => {
    setUser(null);
    return navigate('/'); 
  };

  const register = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { id: users.length + 1, email, password, favorites: [] };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setUser(newUser);
    navigate('/'); 
  };

  const toggleFavorite = (meal) => {
    if (!user) return;

    const updatedFavorites = user.favorites.some(fav => fav.idMeal === meal.idMeal)
      ? user.favorites.filter(fav => fav.idMeal !== meal.idMeal)
      : [...user.favorites, meal];

    const updatedUser = { ...user, favorites: updatedFavorites };
    setUser(updatedUser);

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((u) => u.email === user.email);
    users[userIndex] = updatedUser;
    localStorage.setItem('users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
