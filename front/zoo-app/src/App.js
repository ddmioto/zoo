import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/auth.component';
import MyNavbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Animals from './pages/animals/animals';
import Zoo from './pages/zoo/zoo';
import authService from './pages/auth/services/auth.service';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = authService.getCurrentUser();
      if (user && user.accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  const LoginRoute = ({ element }) => {
    return isAuthenticated ? <Navigate to="/zoo" /> : element;
  };

  return (
    <div className="App">
      {isAuthenticated && <MyNavbar onLogout={handleLogout} />}
      
      <Routes>
        <Route path="/" element={<LoginRoute element={<Auth onLoginSuccess={handleLoginSuccess} />} />} />
        <Route path="/zoo" element={<ProtectedRoute element={<Zoo />} />} />
        <Route path="/animais" element={<ProtectedRoute element={<Animals />} />} />
        <Route path="/login" element={<LoginRoute element={<Auth onLoginSuccess={handleLoginSuccess} />} />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
