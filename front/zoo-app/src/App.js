import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth/auth.component';
import MyNavbar from './components/Navbar';
import { useState } from 'react';
import Animals from './pages/animals/animals';
import Zoo from './pages/zoo/zoo';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ element, ...rest }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    // Verificar posicao do router
    <Router>
    <div className="App">
      {isAuthenticated && <MyNavbar />}

      <Routes>
        <Route path="/" element={<Auth onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/zoo" element={<ProtectedRoute element={<Zoo />} />} />
        <Route path="/animais" element={<ProtectedRoute element={<Animals />} />} />
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/cadastro" element={<Cadastro />} />  */}
      </Routes>
    </div>
    </Router>
  );
}

export default App;
