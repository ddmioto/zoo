import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../pages/auth/services/auth.service';

const MyNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isAdminOrModerator, setIsAdminOrModerator] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.username);

      const roles = user.roles; 
      console.log(roles);
      if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_MODERATOR')) {
        setIsAdminOrModerator(true);
      } else {
        setIsAdminOrModerator(false);
      }
    } else {
      setIsLoggedIn(false);
      setUserName('');
      setIsAdminOrModerator(false);
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setIsAdminOrModerator(false); 
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/zoo">
          <Image src="/assets/lemur.png" style={{ width: '30px', marginRight: '10px' }} />ZooApp
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/zoo">Zoológicos</Nav.Link>
            <Nav.Link as={Link} to="/animais">Animais</Nav.Link>
            {isAdminOrModerator && <Nav.Link as={Link} to="/admin" style={{ color: 'red' }}>Admin</Nav.Link>}
            {/* <Nav.Link as={Link} to="/contact">Contato</Nav.Link> */}
          </Nav>
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <>
                <Nav.Link disabled>Bem-vindo, {userName}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
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
