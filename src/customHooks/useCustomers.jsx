import { useState, useEffect } from 'react';
import { fetchService } from '../components/fetchService';


const useCustomers = (user, isAuthenticated) => {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    ID: '',
    email: '',
    phone: '',
    spa: '',
    fare: '',
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user || !user.email) {
        setMessage('Email del usuario no disponible');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const isAdmin = user.rol === 'admin';

        if (isAdmin) {
          try {
            const customerResult = await fetchService('/costumers', 'GET');
            setCustomers(Array.isArray(customerResult) ? customerResult : [customerResult]);
          } catch (error) {
            if (error.message.includes('404') || error.message.includes('Cliente no encontrado')) {
              console.log('Clientes no encontrados en costumers. Buscando en users...');
              const userResult = await fetchService('/users', 'GET');
              setCustomers([userResult]);
            } else {
              throw error;
            }
          }
        } else {
          const customerEndpoint = `/costumers/email/${user.email}`;

          try {
            const customerResult = await fetchService(customerEndpoint, 'GET');
            setCustomers(Array.isArray(customerResult) ? customerResult : [customerResult]);
          } catch (error) {
            if (error.message.includes('404') || error.message.includes('Cliente no encontrado')) {
              setMessage('Aún no tienes ningún paquete contratado.');
              setCustomers([]);
            } else {
              throw error;
            }
          }
        }

        setMessage(null);
      } catch (err) {
        console.error('Error en la solicitud:', err);
        setMessage(err.message || 'Error desconocido al obtener los datos del cliente');
      }
    };

    if (isAuthenticated && user && user.email) {
      fetchCustomerData();
    } else {
      setCustomers([]);
      setMessage(null);
    }
  }, [user, isAuthenticated]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const response = await fetchService('/costumers', 'POST', formData);
      setCustomers([...customers, response]);
      setFormData({
        fullName: '',
        ID: '',
        email: '',
        phone: '',
        spa: '',
        fare: '',
      });
    } catch (err) {
      console.error('Error al añadir cliente:', err);
      setMessage(err.message);
    }
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const updatedCustomer = await fetchService(`/costumers/${currentCustomer._id}`, 'PUT', formData);
      setCustomers(customers.map((c) => (c._id === updatedCustomer._id ? updatedCustomer : c)));
      setIsEditing(false);
      setFormData({
        fullName: '',
        ID: '',
        email: '',
        phone: '',
        spa: '',
        fare: '',
      });
    } catch (err) {
      console.error('Error al modificar cliente:', err);
      setMessage(err.message);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      await fetchService(`/costumers/${id}`, 'DELETE');
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      setMessage(err.message);
    }
  };

  const handleEditClick = (customer) => {
    setIsEditing(true);
    setCurrentCustomer(customer);
    setFormData({
      fullName: customer.fullName || '',
      ID: customer.ID || '',
      email: customer.email || '',
      phone: customer.phone || '',
      spa: customer.spa?._id || '',
      fare: customer.fare || '',
    });
  };

  return {
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
  };
};

export default useCustomers;
