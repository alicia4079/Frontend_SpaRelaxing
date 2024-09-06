import React from 'react';
import { Link } from 'react-router-dom'; 
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
      </div>
    );
  }

  return (
    <div className="login-container">
      <Form onSubmit={handleLogin} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="register-link">
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p> 
      </div>
    </div>
  );
};

export default Login;





