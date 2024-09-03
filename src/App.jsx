import { NavLink, Outlet } from 'react-router-dom';
import React, { useState } from 'react'; 
import { useAuth } from './customHooks/AuthContext';
import './App.css';

const App = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const [menuOpen, setMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className='App'>
      <header>
        <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Relaxing Spa</h1>
        </NavLink>
        <button className="hamburger" onClick={toggleMenu}>
          <img src="./menu.png" alt="menu" />
        </button>
        <nav className={menuOpen ? 'nav-menu open' : 'nav-menu'}>
          <NavLink to="/spas" onClick={closeMenu} style={({ isActive }) => ({
            textDecoration: 'none', color: isActive ? 'var(--accent-100)' : 'inherit'
          })}>
            Nuestros spas
          </NavLink>
          <NavLink to="/fares" onClick={closeMenu} style={({ isActive }) => ({
            textDecoration: 'none', color: isActive ? 'var(--accent-100)' : 'inherit'
          })}>
            Nuestros precios
          </NavLink>
          {isAuthenticated ? (
            <button onClick={() => { logout(); closeMenu(); }} style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'none', cursor: 'pointer' }}>
              Desconéctate
            </button>
          ) : (
            <NavLink to="/login" onClick={closeMenu} style={({ isActive }) => ({
              textDecoration: 'none', color: isActive ? 'var(--accent-100)' : 'inherit'
            })}>
              Conéctate
            </NavLink>
          )}
          <NavLink to="/client" onClick={closeMenu} style={({ isActive }) => ({
            textDecoration: 'none', color: isActive ? 'var(--accent-100)' : 'inherit'
          })}>
            Tu área
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} style={({ isActive }) => ({
            textDecoration: 'none', color: isActive ? 'var(--accent-100)' : 'inherit'
          })}>
            Contáctanos
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Creado por Alicia Gálvez</footer>
    </div>
  );
}

export default App;
