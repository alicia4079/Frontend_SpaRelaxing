import './Spas.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa'; 
import Loading from '../../components/Loading/Loading';
import { useAuth } from '../../customHooks/AuthContext'; 

const Spas = () => {
  const [spas, setSpas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteSpaId, setFavoriteSpaId] = useState(null); 
  const { isAuthenticated } = useAuth();

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
      } finally {
        setLoading(false); 
      }
    };

    fetchSpas();

    const savedFavoriteSpaId = localStorage.getItem('favoriteSpaId');
    if (savedFavoriteSpaId) {
      setFavoriteSpaId(savedFavoriteSpaId);
    }
  }, []);

  const handleFavorite = (spaId) => {
    if (favoriteSpaId === spaId) {
      localStorage.removeItem('favoriteSpaId');
      setFavoriteSpaId(null);
    } else {
      localStorage.setItem('favoriteSpaId', spaId);
      setFavoriteSpaId(spaId);
    }
  };

  if (loading) {
    return <Loading />; 
  }

  return (
    <div id='spas'>
      <h2>Elige tu oasis en uno de nuestros cuatro destinos</h2>
      <div className={`spa-grid ${isAuthenticated ? 'authenticated' : ''}`}>
        {spas.map((spa) => (
          <div key={spa._id} className={`spa-card ${isAuthenticated && favoriteSpaId === spa._id ? 'favorite' : ''}`}>
            <Link to={`/spas/${spa._id}`} className='spa-card-link'>
              <div className='spa-image-container'>
                <img
                  src={`https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978/${spa.city.toLowerCase()}.jpg`}
                  alt={spa.city}
                  className='spa-image'
                  loading="lazy"
                  onMouseOver={(e) =>
                    (e.currentTarget.src = `https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978/${spa.city.toLowerCase()}_hover.jpg`)
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.src = `https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978/${spa.city.toLowerCase()}.jpg`)
                  }
                />
              </div>
              <h3>{spa.city}</h3>
              <p>{spa.name}</p>
            </Link>

            {isAuthenticated && (
              <button
                className={`favorite-btn ${favoriteSpaId === spa._id ? 'favorite' : ''}`}
                onClick={() => handleFavorite(spa._id)}
              >
                <FaStar className={favoriteSpaId === spa._id ? 'gold-star' : 'grey-star'} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Spas;

