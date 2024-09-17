import React from 'react'; 
import { useAuth } from '../../customHooks/AuthContext';
import './ExclusiveContent.css';

const ExclusiveContent = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      {isAuthenticated && user.rol !== 'admin' && (
        <div className="exclusive-content">
          <h2>Contenido Exclusivo</h2>
          <p>Aquí te dejamos una de nuestras playlist para comenzar la relajación</p>
          <div className="video-container">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX2DjEOgyULQF?utm_source=generator"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default ExclusiveContent;

