"use client"

import React, { useState } from 'react';
import styles from './Membri.module.css';

function Membri({ name, correlators}) {

  return (
    <div className={styles.membriContainer}>
      <h2>Studente: {name} </h2>
      <h3>Relatore: {name} </h3>
      <div className={styles.correlatorsContainer}>
        <h3>Correlatori</h3>
        {correlators.map((correlator, index) => (
          <div key={index} className={styles.correlatorItem}>
            {correlator}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Membri;
  