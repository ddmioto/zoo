import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('username:', username);
    console.log('Senha:', password);
    try {
      const response = await axios.post('http://localhost:8081/api/auth/signin', {
        username,
        password
      });
  
      console.log(response);
      localStorage.setItem('authToken', response.data.accessToken);
      navigate('/home');
      window.location.reload();
    } catch (error) {
      setError('Invalid username or password');
      console.error('Login failed:', error);
    };

  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nome de usuario</label>
              <input 
                type="username" 
                className="form-control" 
                id="username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Senha</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
