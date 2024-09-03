import React, { useEffect, useState } from 'react';
import './Contact.css';
import Loading from '../../components/Loading/Loading';

const Contact = () => {
  const [spas, setSpas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await fetch('https://backend-spas.vercel.app/api/v1/spas');
        if (!response.ok) {
          throw new Error('Error al obtener los spas');
        }
        const data = await response.json();
        setSpas(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchSpas(); 
  }, []); 

  if (loading) {
    return <Loading />; 
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div className='contact-container'>
      <div className='continent-img'>
      <img src="/toallas.jpg" alt="toallas" /><img src="/geotermal.jpg" alt="terapia geotermal" />
      </div>
      <div className='contact-information'>
        {spas.map(spa => (
          <div key={spa._id} className='spa-contact'>
            <h2>{spa.name}</h2>
            <p><strong>Ciudad:</strong> {spa.city}</p>
            <p><strong>Dirección:</strong> {spa.address}</p>
            <p><strong>Teléfono:</strong> {spa.phoneNumber}</p>
            <p><strong>Email:</strong> {spa.email}</p>
            <p><strong>Servicio extra:</strong> {spa.service || 'No especificado'}</p>
          </div>
        ))}
      </div>
      <div className='continent-img'><img src="/chica_piscina.jpg" alt="chica en piscina" /><img src="/masaje.jpg" alt="masaje" /></div>
    </div>
  );
};

export default Contact;
