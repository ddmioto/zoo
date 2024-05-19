import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
//   // Verificar se o usuário está autenticado
//   const isAuthenticated = !!localStorage.getItem('authToken');

//   return isAuthenticated ? (
//     // Se o usuário estiver autenticado, renderize o componente
//     <Route {...rest} element={<Component />} />
//   ) : (
//     // Se o usuário não estiver autenticado, redirecione para a página de login
//     <Navigate to="/login" replace />;
//   );
};

export default ProtectedRoute;
