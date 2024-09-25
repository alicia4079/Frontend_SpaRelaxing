import React, { useState } from 'react';
import { useAuth } from '../../customHooks/AuthContext';
import { fetchService } from '../fetchService';


const ChangePasswordForm = ({ onClose }) => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [notification, setNotification] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      setPasswordError('Token de autenticación no disponible.');
      return;
    }

    if (currentPassword.trim().length < 6 || newPassword.trim().length < 6) {
      setPasswordError('Ambas contraseñas deben tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetchService(`/users/${user._id}`, 'PUT', { currentPassword, newPassword }, user.token);

      if (response) { 
        setNotification('Contraseña actualizada correctamente.');
        setCurrentPassword('');
        setNewPassword('');
        setPasswordError('');

        setTimeout(() => {
          if (onClose) onClose(); 
        }, 3000);
      }
    } catch (error) {
      if (error.message === 'La nueva contraseña no puede ser igual a la actual') {
        setPasswordError('La nueva contraseña no puede ser igual a la actual.');
      } else if (error.message === 'La contraseña actual es incorrecta') {
        setPasswordError('La contraseña actual es incorrecta.');
      } else {
        setPasswordError(error.message || 'Error al cambiar la contraseña.');
      }
    }
  };

  return (
    <div className="change-password-form">
      <form onSubmit={handlePasswordChange}>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Contraseña actual"
          required
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nueva contraseña"
          required
        />
        <button type="submit">Guardar nueva contraseña</button>
        {passwordError && <div className="error">{passwordError}</div>}
        {notification && <div className="notification">{notification}</div>}
      </form>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default ChangePasswordForm;






