import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Spa.css';
import spaDescriptions from '../../components/spaDescriptions';
import Loading from '../../components/Loading/Loading';



const Spa = () => {
  const { id } = useParams();
  const [spa, setSpa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchSpa = async () => {
      try {
        const response = await fetch(`https://backend-spas.vercel.app/api/v1/spas/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
