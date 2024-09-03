import React from 'react';
import './Loading.css'; 

const Loading = () => {
  return (
    <div className="loading-container">
      <img src="/loading.gif" alt="Cargando..." className="loading-image" />
    </div>
  );
};

export default Loading;