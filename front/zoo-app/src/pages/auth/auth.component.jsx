import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import AuthService from './services/auth.service';
import { useNavigate } from 'react-router-dom';

function Auth({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const service = new AuthService();
  const navigate = useNavigate();

  const handleLogin = async () => {
    onLoginSuccess(); //TODO Remover
    navigate('/zoo');// TODO Remover

    setLoading(true);
    setError('');
    try {
      const response = await service.login(email, password);
      console.log('Login successful:', response);
      // Redirecionar ou realizar outras ações após login bem-sucedido
      onLoginSuccess(); //
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
              label='Email address' 
              id='form1' 
              type='email' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <MDBInput 
              wrapperClass='mb-4' 
              label='Password' 
              id='form2' 
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
          <img src="/assets/zoboo.jpg" style={{width: '80%', height: 'auto', objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Auth;
