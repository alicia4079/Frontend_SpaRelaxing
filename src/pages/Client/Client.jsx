import React from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../customHooks/AuthContext';
import useSpas from '../../customHooks/useSpas';
import './Client.css';
import useCustomers from '../../customHooks/useCustomers';

const Client = () => {
  const { user, isAuthenticated } = useAuth();
  const { spas, error: spasError } = useSpas();
  const {
    customers,
    message,
    isEditing,
    currentCustomer,
    formData,
    handleFormChange,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleEditClick,
  } = useCustomers(user, isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className='no-costumer-alert'>
        <h2>Ups, parece que no tienes ninguna tarifa con nosotros.</h2>
        <Link to="/fares">Mira nuestros precios</Link> 
      </div>
    );
  }

  if (message || spasError) {
    return (
      <div className='no-costumer-alert'>
        <h2>{message || spasError}</h2>
        <Link to="/fares">Consulta nuestros precios</Link> 
      </div>
    );
  }

  return (
    <div className='client-continent-costumer'>
      <h2>{user.rol === 'admin' ? 'Datos de todos los clientes' : 'Tus datos'}</h2>
      {user.rol === 'admin' && (
        <div>
          <h3>{isEditing ? 'Editar Cliente' : 'Añadir Cliente'}</h3>
          <form onSubmit={isEditing ? handleEditCustomer : handleAddCustomer}>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} placeholder="Nombre Completo" required />
            <input type="text" name="ID" value={formData.ID} onChange={handleFormChange} placeholder="DNI" required />
            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required />
            <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Teléfono" required />
            <input type="number" name="fare" value={formData.fare} onChange={handleFormChange} placeholder="Tarifa" required />
            <select name="spa" value={formData.spa} onChange={handleFormChange} required>
  <option value="">Selecciona un Spa</option>
  {spas.map(spa => (
    <option key={spa._id} value={spa._id}>{spa.name}</option>
  ))}
</select>
            <button type="submit">{isEditing ? 'Guardar Cambios' : 'Añadir Cliente'}</button>
          </form>
        </div>
      )}
      {customers.map((customer, index) => (
        <div key={index} className='client-data'>
          <p><strong>Nombre Completo:</strong> {customer.fullName || 'N/A'}</p>
          <p><strong>DNI:</strong> {customer.ID || 'N/A'}</p>
          <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
          <p><strong>Teléfono:</strong> {customer.phone || 'N/A'}</p>
          <p><strong>SPA:</strong> {customer.spa ? customer.spa.name : 'N/A'}</p>
          <p><strong>Tarifa:</strong> {customer.fare || 'N/A'}</p>
          {user.rol === 'admin' && (
            <div className='client-buttons'>
              <button onClick={() => handleEditClick(customer)}>Editar</button>
              <button onClick={() => handleDeleteCustomer(customer._id)}>Eliminar</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Client;










