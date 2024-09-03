import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useLoginHandler from '../../customHooks/useLoginHandler';
import './Register.css';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { handleLogin } = useLoginHandler();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (data) => {
    try {
      const registerResponse = await fetch('https://backend-spas.vercel.app/api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const registerResultText = await registerResponse.text();

      if (!registerResponse.ok) {
        throw new Error(registerResultText);
      }

      const registerResult = JSON.parse(registerResultText);

      await handleLogin({ userName: data.userName, password: data.password });

      setSuccessMessage('Registro y login exitosos. Redirigiendo...');
      setErrorMessage('');

      setTimeout(() => navigate('/client'), 1000);
      
    } catch (error) {
      console.error('Error:', error.message);
      setErrorMessage(error.message || 'Error en la solicitud de registro');
      setSuccessMessage('');
    }
  };

  return (
    <div className="register">
      <div className="register-container">
        <h2>Registro de Nuevo Usuario</h2>
        <form onSubmit={handleSubmit(handleRegister)} className="register-form">
          <div className="form-group">
            <label htmlFor="userName">Nombre de Usuario:</label>
            <input
              type="text"
              id="userName"
              {...register('userName', { required: 'El nombre de usuario es obligatorio' })}
            />
            {errors.userName && <p className="error-message">{errors.userName.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'El correo electrónico es obligatorio',
                pattern: { value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, message: 'Ingrese un correo válido' } 
              })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              {...register('password', { 
                required: 'La contraseña es obligatoria', 
                minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } 
              })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          <button type="submit" className="register-button">Registrarse</button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default Register;




