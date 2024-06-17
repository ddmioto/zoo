// src/pages/auth/auth.component.jsx (ou .js)

import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import authService from './services/auth.service';

function Auth({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await authService.login(username, password);
      console.log('Login successful:', response);
      onLoginSuccess(); // Chama a função de sucesso após o login
      navigate('/zoo'); // Redireciona para a página desejada após o login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MDBContainer className="my-5 gradient-form">
      <MDBRow className='align-items-center'>
        <MDBCol col='6' className="mb-5">
          <div className="d-flex flex-column ms-5">
            <div className="text-center">
              <img src="/assets/lemur.png" style={{width: '185px'}} alt="logo" />
              <h4 className="mt-1 mb-5 pb-1">Zoo App</h4>
            </div>
            <p>Faça login na sua conta</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <MDBInput 
              wrapperClass='mb-4' 
              label='Username' 
              id='username' 
              type='text' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label='Password' 
              id='password' 
              type='password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <MDBBtn onClick={handleLogin} disabled={loading}>
              {loading ? 'Carregando...' : 'Login'}
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="/assets/zoboo.jpg" style={{width: '80%', height: 'auto', objectFit: 'cover', objectPosition: 'left'}} alt="zoboo" />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Auth;
