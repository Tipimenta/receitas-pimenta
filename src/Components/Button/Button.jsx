import React from 'react';
import './Button.css';

const Button = ({ text, onClick }) => {
  return (
    <a href="/" className="button-primary" onClick={onClick}>
      {text}
    </a>
  );
};

export default Button;
