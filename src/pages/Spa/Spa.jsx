import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Spa.css';
import spaDescriptions from '../../components/spaDescriptions';
import Loading from '../../components/Loading/Loading';
import { fetchService } from '../../components/fetchService';


const Spa = () => {
  const { id } = useParams();
  const [spa, setSpa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchSpa = async () => {
      try {
        const data = await fetchService(`/spas/${id}`, 'GET'); 
        setSpa(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSpa();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) { 
    return <div>Error: {error}</div>;
  }

  if (!spa) {
    return <div>No se encontró el spa.</div>;
  }

  const description = spaDescriptions[spa.city] || "Disfruta de una experiencia de spa inigualable.";

  return (
    <div id="spa-details">
      <h2>{spa.name}</h2>
      <div className="spa-details-content">
        <p>{description}</p>
        <img
          src={`https://res.cloudinary.com/disgdgdyr/image/upload/v1723188978/${spa.city.toLowerCase()}_details.jpg`}
          alt={spa.city}
          className="spa-details-image"
        />
      </div>
    </div>
  );
};

export default Spa;
