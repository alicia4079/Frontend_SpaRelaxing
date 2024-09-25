import React from 'react'
import './Fares.css'
import { Link } from 'react-router-dom'


const Fares = () => {
  return (
<div className="client-continent no-register">
  <h2>Todos nuestros packs</h2>
  <p className='info-contact'>Para contratar un pack consulta nuestros datos de contacto <Link to="/contact">aquí</Link> </p>
  <div className="price-columns">
    <div className="price-column">
      <h3>Plan Básico</h3>
      <ul>
        <li>1 vez al mes</li>
      </ul>
      <p className="price">50€</p>
    </div>
    <div className="price-column">
      <h3>Plan Regular</h3>
      <ul>
        <li>2 veces al mes</li>
      </ul>
      <p className="price">90€</p>
    </div>
    <div className="price-column">
      <h3>Plan Frecuente</h3>
      <ul>
        <li>4 veces al mes</li>
      </ul>
      <p className="price">150€</p>
    </div>
    <div className="price-column">
      <h3>Plan Premium</h3>
      <ul>
        <li>4 veces al mes</li>
        <li>2 horas premium</li>
        <li>Incluye 1 acompañante 1 vez al mes</li>
      </ul>
      <p className="price">199€</p>
    </div>
    <div className="price-column">
      <h3>Entrada Única</h3>
      <ul>
        <li>Gana un 5% de descuento si se inscribe en uno de los planes</li>
      </ul>
      <p className="price">60€</p>
    </div>
  </div>
  <p>*Todos nuestros planes tienen una permanencia de 6 meses</p>
  <div className='extras'>
    <div className="extras-text">
      <p><strong>Extras en cada ciudad</strong></p>
      <p>por solo 20 euros adicionales al mes</p>
    </div>
    <ul className="extras-list">
      <li><strong>Madrid:</strong> Masaje 15 minutos</li>
      <li><strong>Barcelona:</strong> Pedicura</li>
      <li><strong>Valencia:</strong> Terapia geotermal 15 minutos</li>
      <li><strong>Sevilla:</strong> Sillón de masaje 30 minutos</li>
    </ul>
  </div>
 
</div>
  )
}

export default Fares