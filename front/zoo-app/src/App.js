import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Login from './pages/User/login/Login';
import Home from './pages/home/Home';
import Cadastro from './pages/User/cadastro/Cadastro';
import MyNavbar from './components/Navbar';


function App() {
  return (
    // Verificar posicao do router
    <Router>
    <div className="App">

      <MyNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
