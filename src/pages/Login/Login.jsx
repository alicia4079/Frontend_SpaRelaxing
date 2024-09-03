import React from 'react';
import useLoginHandler from '../../customHooks/useLoginHandler';
import { useAuth } from '../../customHooks/AuthContext';
import Form from '../../components/Form/Form';
import './Login.css';

const Login = () => {
  const { isAuthenticated } = useAuth();
  const { handleLogin, errorMessage, welcomeMessage } = useLoginHandler();

  if (isAuthenticated) {
    return (
      <div className="login-container">
        <div className="welcome-message">{welcomeMessage}</div>
        <a href="/client">Ve a tu área</a>
      </div>
    );
  }

  return (
    <div className="login-container">
      <Form onSubmit={handleLogin} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="register-link">
        <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
      </div>
    </div>
  );
};

export default Login;





