import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/auth.component';
import MyNavbar from './components/Navbar';
import { useState, useEffect } from 'react';
import Animals from './pages/animals/animals';
import Zoo from './pages/zoo/zoo';
import authService from './pages/auth/services/auth.service';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = authService.getCurrentUser();
      if (user && user.accessToken) {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <MyNavbar onLogout={handleLogout} />}
        
        <Routes>
          <Route path="/" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/zoo" element={<ProtectedRoute element={<Zoo />} />} />
          <Route path="/animais" element={<ProtectedRoute element={<Animals />} />} />
          <Route path="/login" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
