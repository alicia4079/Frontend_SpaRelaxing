import { useState } from 'react';
import { useAuth } from './AuthContext';
import { fetchService } from '../components/fetchService';


const useLoginHandler = () => {
  const { login } = useAuth();  
  const [errorMessage, setErrorMessage] = useState(''); 
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleLogin = async (data) => {
    try {
      const response = await fetchService('/users/login', 'POST', data);
  
      console.log('Inicio de sesión exitoso:', response);
  
      const { token, user } = response;
  
      if (token) {
        localStorage.setItem('token', token);
        console.log('Token guardado en localStorage:', localStorage.getItem('token'));
        
        login(user);
        setWelcomeMessage(`¡Bienvenid@ de nuevo, ${user.userName}! 😊`);
        setErrorMessage('');
      } else {
        throw new Error('Token no recibido');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage('El usuario o la contraseña son incorrectos.');
      setWelcomeMessage('');
    }
  };

  return { handleLogin, errorMessage, welcomeMessage };  
};

export default useLoginHandler;


