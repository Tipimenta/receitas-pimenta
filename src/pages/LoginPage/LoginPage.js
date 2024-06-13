import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Header from "../../Components/Header/Header";
import ApiReceitasNome from "../../Components/ApiReceitas/ApiReceitasNome";
import Tags from "../../Components/Tags/Tags";
import "./LoginPage.css";
import logo from "../../assets/img/logo-pimenta.png";
import Footer from "../../Components/Footer/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <>

      <Header onSearch={handleSearch} />

      {searchTerm ? (
        <ApiReceitasNome searchTerm={searchTerm} />
      ) : (
        <>

          <div className="login">
            <img src={logo} alt="logo" />
            <div className="conteudo-login">
              <Tags legenda="Login" />
              <div className="formulario">
                <form onSubmit={handleSubmit}>
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
                    <button type="submit">ENTRAR</button>
                    <p>
                      Ainda não tem uma conta? <Link to="/signup">Cadastre-se</Link>
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

export default LoginPage;
