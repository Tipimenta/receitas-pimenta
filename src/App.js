import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import HomePage from './pages/HomePage';
import { AuthProvider } from './hooks/useAuth';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import CategoryPage from './pages/CategoryPage/CategoryPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
