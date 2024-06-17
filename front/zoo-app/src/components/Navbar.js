// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout, por exemplo, limpar tokens de autenticação
    console.log("Usuário deslogado");
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');  // Redirecionar para a página inicial
  };

  const handleLogin = () => {
    // Redirecionar para a página de login
    navigate('/login');
    console.log(`SEXO`);
  };

  useEffect(() => {
    // Verificar se o token de autenticação está presente no localStorage
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
    console.log(isLoggedIn)
  }, []);
  
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/zoo">ZooApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/zoo">Zológicos</Nav.Link>
            <Nav.Link as={Link} to="/animais">Animais</Nav.Link>
            {/* <Nav.Link as={Link} to="/contact">Contato</Nav.Link> */}
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link onClick={handleLogin}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
