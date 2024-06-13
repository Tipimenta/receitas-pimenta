
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./SignUpPage.css"
import Header from '../../Components/Header/Header';
import Tags from "../../Components/Tags/Tags";
import logo from "../../assets/img/logo-pimenta.png";
import ApiReceitasNome from "../../Components/ApiReceitas/ApiReceitasNome"
import Footer from "../../Components/Footer/Footer";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    register(email, password);

    navigate("/favorites");
  };

  return (
    <>
      
      <Header onSearch={handleSearch} />
      {searchTerm ? (
        <ApiReceitasNome searchTerm={searchTerm} />
      ) : (
        <>
    <div className="cadastro">
      <img src={logo} alt="logo" />
      <div className="conteudo-cadastro">
        <Tags legenda="Cadastro" />
        <div className="formulario">
          <form onSubmit={handleSignUp}>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="rodape-formulario">
              <button type="submit">Cadastrar</button>
              <p>
                Já tem uma conta? <Link to="/login">Entrar</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )}
    <Footer />
    </>
  );
};

export default SignUpPage;
