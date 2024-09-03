import { useState, useEffect } from 'react';

const useCustomers = (user, isAuthenticated) => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
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
        setError('Email del usuario no disponible');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const isAdmin = user.rol === 'admin';
        const url = isAdmin
          ? 'https://backend-spas.vercel.app/api/v1/costumers'
          : `https://backend-spas.vercel.app/api/v1/costumers/email/${user.email}`;

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }

        const customerResult = await response.json();
        setCustomers(Array.isArray(customerResult) ? customerResult : [customerResult]);
      } catch (err) {
        console.error('Error en la solicitud:', err);
        setError(err.message);
      }
    };

    if (isAuthenticated && user && user.email) {
      fetchCustomerData();
    } else {
      setCustomers([]);
      setError(null);
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

      const response = await fetch('https://backend-spas.vercel.app/api/v1/costumers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const newCustomer = await response.json();
      setCustomers([...customers, newCustomer]);
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
      setError(err.message);
    }
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend-spas.vercel.app/api/v1/costumers/${currentCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al modificar el cliente');
      }

      const updatedCustomer = await response.json();
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
      setError(err.message);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://backend-spas.vercel.app/api/v1/costumers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Error al eliminar cliente:', err);
      setError(err.message);
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
    error,
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
