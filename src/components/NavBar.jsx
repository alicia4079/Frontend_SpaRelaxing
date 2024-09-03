import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../customHooks/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/spas">Spas</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        {isAuthenticated ? (
          <li><button onClick={logout}>Desconéctate</button></li>
        ) : (
          <li><Link to="/login">Conectarse</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;