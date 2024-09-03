import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Spas from './pages/Spas/Spas';
import Spa from './pages/Spa/Spa';
import Login from './pages/Login/Login';
import Client from './pages/Client/Client';
import Contact from './pages/Contact/Contact';
import Register from './pages/Register/Register.jsx';
import { AuthProvider } from './customHooks/AuthContext';
import Fares from './pages/Fares/Fares.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="spas" element={<Spas />} />
          <Route path="spas/:id" element={<Spa />} />
          <Route path="fares" element={<Fares />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="client" element={<Client />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);