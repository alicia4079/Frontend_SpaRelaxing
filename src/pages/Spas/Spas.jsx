import './Spas.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';

const Spas = () => {
  const [spas, setSpas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await fetch('https://backend-spas.vercel.app/api/v1/spas');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSpas(data);
      } catch (error) {
        console.error('Error al obtener los spas:', error);
      }finally {
        setLoading(false); 
      }
    };

    fetchSpas();
  }, []);

  if (loading) {
    return <Loading />; 
  }

  return (
    <div id='spas'>
      <h2>Elige tu oasis en uno de nuestros cuatro destinos</h2>
      <div className='spa-grid'>
        {spas.map((spa) => (
          <Link to={`/spas/${spa._id}`} key={spa._id} className='spa-card-link'>
            <div className='spa-card'>
              <div className='spa-image-container'>
                <img
                  src={`https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978/${spa.city.toLowerCase()}.jpg`}
                  alt={spa.city}
                  className='spa-image'
                  loading="lazy"
                  onMouseOver={(e) =>
                    (e.currentTarget.src = `https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978//${spa.city.toLowerCase()}_hover.jpg`)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.src = `https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978/${spa.city.toLowerCase()}.jpg`)
                  }
                />
              </div>
              <h3>{spa.city}</h3>
              <p>{spa.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Spas;
