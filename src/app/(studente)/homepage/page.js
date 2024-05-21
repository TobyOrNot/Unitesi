import React from 'react';
import './HomePage.css';

function HomePage({ email }) {
  return (
    <div className="homepage-container">
      <header className="header">
        <p>Benvenuto, {email="tobias.paparelli@studio.unibo.it"}</p>
      </header>
      <div className="actions">
        <h2>Azioni Disponibili</h2>
        <button>Scrivi Tesi</button>
        <button>Visualizza Documenti</button>
        <button>Invia Comunicazione</button>
        <button>Profilo</button>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default HomePage;
