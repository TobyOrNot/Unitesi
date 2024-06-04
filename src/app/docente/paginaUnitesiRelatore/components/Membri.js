"use client"

import React, { useState } from 'react';
import styles from './Membri.module.css';

function Membri({ name, correlators, onAddCorrelator, onRemoveCorrelator }) {
  const [newCorrelatorEmail, setNewCorrelatorEmail] = useState('');

  const handleAddCorrelator = () => {
    if (newCorrelatorEmail) {
      onAddCorrelator(newCorrelatorEmail);
      setNewCorrelatorEmail('');
    }
  };

  return (
    <div className={styles.membriContainer}>
      <h2>Studente: {name}</h2>
      <div className={styles.correlatorsContainer}>
        <h3>Correlatori</h3>
        {correlators.map((correlator, index) => (
          <div key={index} className={styles.correlatorItem}>
            {correlator}
            <button className={styles.removeButton} onClick={() => onRemoveCorrelator(index)}>
              Rimuovi
            </button>
          </div>
        ))}
        <div className={styles.addCorrelator}>
          <input
            type="email"
            placeholder="Email correlatore"
            value={newCorrelatorEmail}
            onChange={(e) => setNewCorrelatorEmail(e.target.value)}
          />
          <button onClick={handleAddCorrelator}>Aggiungi</button>
        </div>
      </div>
    </div>
  );
};

export default Membri;
  