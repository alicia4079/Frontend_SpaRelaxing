import { NavLink, Outlet } from 'react-router-dom';
import React, { useState, useEffect } from 'react'; 
import { useAuth } from './customHooks/AuthContext';
import './App.css';
import { routes_app } from './components/routes_app';

const App = () => {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          {routes_app.map(route => {

            if (route.path === '/login') {
              return isAuthenticated ? (
                <button
                  key="logout"
                  onClick={() => { logout(); closeMenu(); }}
                  style={{ textDecoration: 'none', color: 'inherit', border: 'none', background: 'none', cursor: 'pointer' }}
                >
                  Desconéctate
                </button>
              ) : (
                <NavLink
                  key={route.path}
                  to={route.path}
                  onClick={closeMenu}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? 'var(--accent-100)' : 'inherit'
                  })}
                >
                  {route.label}
                </NavLink>
              );
            }
           
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  onClick={closeMenu}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    color: isActive ? 'var(--accent-100)' : 'inherit'
                  })}
                >
                  {route.label}
                </NavLink>
              );
          })}
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

