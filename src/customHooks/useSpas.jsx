import { useState, useEffect } from 'react';

const useSpas = () => {
  const [spas, setSpas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpas = async () => {
      try {
        const response = await fetch('https://backend-spas.vercel.app/api/v1/spas');
        if (!response.ok) {
          throw new Error('Error al obtener los spas');
        }
        const spasResult = await response.json();
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
