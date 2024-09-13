import { useForm } from 'react-hook-form';
import './Form.css';
import React from 'react';

const Form = ({ onSubmit }) => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      userName: '',
      password: ''
    }
  });

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
    }
  });

  return (
    <div className="form-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleFormSubmit} className="form">
        <div className="label-input-container">
          <label htmlFor="userName">Nombre de Usuario:</label>
          <input
            {...register('userName', {
              required: 'El nombre de usuario es obligatorio',
             pattern: { 
            value: /^[a-zA-Z0-9._-]{3,20}$/, 
             message: 'El nombre de usuario debe tener entre 3 y 20 caracteres y solo puede contener letras, números, ,puntos, guiones o guiones bajos.' 
              }
            })}
            type="text"
            id="userName"
          />
          {formState.errors.userName && (
            <p className="error-message">{formState.errors.userName.message}</p>
          )}
        </div>

        <div className="label-input-container">
          <label htmlFor="password">Contraseña:</label>
          <input
            {...register('password', {
              required: 'La contraseña es obligatoria',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres'
              }
            })}
            type="password"
            id="password"
          />
          {formState.errors.password && (
            <p className="error-message">{formState.errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={!formState.isDirty}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Form;
