import { useState } from 'react';
import { useAuth } from './AuthContext';

const useLoginHandler = () => {
  const { login } = useAuth();  
  const [errorMessage, setErrorMessage] = useState(''); 
  const [welcomeMessage, setWelcomeMessage] = useState('');

  const handleLogin = async (data) => {
    try {
      const response = await fetch('https://backend-spas.vercel.app/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message || 'Error en la solicitud de inicio de sesión');
      }
  
      const result = await response.json(); 
      console.log('Inicio de sesión exitoso:', result);
  
      const { token, user } = result;
  
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




