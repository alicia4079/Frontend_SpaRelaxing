import { useState, useEffect } from 'react';
import { fetchService } from '../components/fetchService';


const useSpas = () => {
  const [spas, setSpas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const spasResult = await fetchService('/spas', 'GET'); 
        setSpas(spasResult);
      } catch (err) {
        console.error('Error en la solicitud de spas:', err);
        setError(err.message);
      }
    };

    fetchSpas();
  }, []);

  return { spas, error };
};

export default useSpas;
