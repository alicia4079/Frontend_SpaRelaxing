import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../customHooks/AuthContext';
import useSpas from '../../customHooks/useSpas';
import useCustomers from '../../customHooks/useCustomers';
import './Client.css';
import ExclusiveContent from '../../components/ExclusiveContent/ExclusiveContent';
import ChangePasswordForm from '../../components/ChangePasswordForm/ChangePasswordForm';

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

  const [customersState, setCustomersState] = useState(customers);
  const [notification, setNotification] = useState(null);
  const [confirmedServices, setConfirmedServices] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  useEffect(() => {
    setCustomersState(customers);
  }, [customers]);

  const handleAddAdditionalService = (customerId, service) => {
    if (!confirmedServices[customerId]) {
      if (window.confirm(`¿Estás seguro de que deseas añadir el servicio "${service}"? La tarifa se aumentará en 20€ para el mes en curso.`)) {
        setConfirmedServices(prev => ({
          ...prev,
          [customerId]: true,
        }));

        setCustomersState(prevCustomers => {
          const updatedCustomers = prevCustomers.map(customer => {
            if (customer._id === customerId) {
              if (!customer.additionalServices || !customer.additionalServices.includes(service)) {
                return {
                  ...customer,
                  fare: (parseFloat(customer.fare) || 0) + 20,
                  additionalServices: [...(customer.additionalServices || []), service]
                };
              } else {
                return customer;
              }
            }
            return customer;
          });
          return updatedCustomers;
        });

        setNotification(`${service} añadido. La tarifa se ha aumentado en 20€ para el mes en curso.`);
      }
    } else {
      setNotification(`${service} ya ha sido añadido.`);
    }
  };

  const handleEditClickWrapper = (customer) => {
    handleEditClick(customer);
    const formElement = document.getElementById('customer-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className='client-container'>
        <div className='no-costumer-alert'>
          <h2>Ups, parece que no estás autenticado.</h2>
          <Link to="/login">Inicia sesión</Link>
        </div>
      </div>
    );
  }

  if (message || spasError) {
    return (
      <div className='client-container'>
        <div className='no-costumer-alert'>
          <h2>{message || spasError}</h2>
          <Link to="/fares">Consulta nuestros precios</Link>
          <div>
            <button
              className='passwordButton'
              onClick={() => setIsChangingPassword(prev => !prev)}
            >
              {isChangingPassword ? 'Cancelar' : 'Cambiar Contraseña'}
            </button>
            {isChangingPassword && (
              <ChangePasswordForm onClose={() => setIsChangingPassword(false)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='client-container'>
      <div className='client-data'>
        <h2>{user.rol === 'admin' ? 'Datos de todos los clientes' : 'Tus datos'}</h2>

        {user.rol === 'admin' && (
          <div id="customer-form">
            <h3>{isEditing ? 'Editar Cliente' : 'Añadir Cliente'}</h3>
            <form className='formAdmin' onSubmit={isEditing ? handleEditCustomer : handleAddCustomer}>
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

        {customersState.length > 0 ? (
          customersState.map((customer, index) => (
            <div key={index} className='client-data-item'>
              <p><strong>Nombre Completo:</strong> {customer.fullName || 'N/A'}</p>
              <p><strong>DNI:</strong> {customer.ID || 'N/A'}</p>
              <p><strong>Email:</strong> {customer.email || 'N/A'}</p>
              <p><strong>Teléfono:</strong> {customer.phone || 'N/A'}</p>
              <p><strong>SPA:</strong> {customer.spa ? customer.spa.name : 'N/A'}</p>
              <p><strong>Tarifa:</strong> {customer.fare || 'N/A'} €</p>

              {user.rol !== 'admin' && customer.fare && (
                <div className='aditional-services'>
                  <h4>Servicios Adicionales Disponibles:</h4>
                  <ul>
                    {spas.find(spa => spa._id === customer.spa._id)?.service && (
                      <li>
                        <button
                          onClick={() => handleAddAdditionalService(customer._id, customer.spa.service)}
                        >
                          Añadir Servicio: {customer.spa.service}
                        </button>
                      </li>
                    )}
                  </ul>
                  {notification && <div className="notification">{notification}</div>}
                </div>
              )}

              {(user.rol === 'admin' || user._id === customer._id) && (
                <div className='client-buttons'>
                  {user.rol === 'admin' && (
                    <>
                      <button onClick={() => handleEditClickWrapper(customer)}>Editar</button>
                      <button onClick={() => handleDeleteCustomer(customer._id)}>Eliminar</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tienes tarifas asignadas.</p>
        )}

        <div>
          <button
            className='passwordButton'
            onClick={() => setIsChangingPassword(prev => !prev)}
          >
            {isChangingPassword ? 'Cancelar' : 'Cambiar Contraseña'}
          </button>
          {isChangingPassword && (
            <ChangePasswordForm onClose={() => setIsChangingPassword(false)} />
          )}
        </div>
      </div>

      {user.rol !== 'admin' && (
        <div className='exclusive-content-container'>
          <ExclusiveContent />
        </div>
      )}
    </div>
  );
};

export default Client;



















