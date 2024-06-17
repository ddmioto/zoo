import React, { useState } from 'react';
import axios from 'axios';

function CadastroUsuario() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('password:', password);
    try {
      const response = await axios.post('http://localhost:8081/api/auth/signup', {
        username,
        email,
        password
      });
  
      console.log(response);
    } catch (error) {
      setError('Invalid username or password');
      console.error('Creation failed:', error);
    };
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <h2>Cadastro de Usuário</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">E-mail</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Usuário</label>
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
              <label htmlFor="password" className="form-label">password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;
