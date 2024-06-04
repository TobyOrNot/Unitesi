"use client"

import React, { useState, useEffect } from 'react';
import styles from './ViewPages.module.css';
import PageItem from './components/PageItem';
import SearchHeader from './components/searchHeader';

const pagesData = [
  {
    name: 'Pattern Reflection - Modelli e Applicazioni',
    members: ['Antonio Pio Evangelista'],
    studentRole: 'Tesista Triennale',
    teacherRole: 'Relatore',
    creationDate: '2024-03-21',
    url: '/pagina-1',
  },
  {
    name: 'Progettazione e Implementazione di un sistema SCADA personalizzato in .NET per Impianti Fotovoltaici',
    members: ['Paolo Ciaccia', 'Tomas Conti'],
    studentRole: 'Tesista Triennale',
    teacherRole: 'Correlatore',
    creationDate: '2023-06-15',
    url: '/pagina-2',
  },
  {
    name: 'Architetture Data Lakehouse per Data Platform analitiche',
    members: ['Tobias Paparelli'],
    studentRole: 'Tesista Magistrale',
    teacherRole: 'Relatore',
    creationDate: '2021-05-05',
    url: '/pagina-3',
  },
  {
    name: 'Sensor networks optimization and software development for Structural Health Monitoring based on ultrasonic guided waves',
    members: ['Samuele Gasbarro'],
    studentRole: 'Tesista Dottorato',
    teacherRole: 'Relatore',
    creationDate: '2020-09-19',
    url: '/pagina-4',
  },
  // Aggiungi altre pagine qui
];

function ViewPages() {

  const [nomeDocente, setNomeDocente] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const response = await fetch('http://localhost:3001/isAuthenticated', {
        method: 'GET',
        credentials: 'include' // Include session credentials
      });
  
      if (response.ok) {
        const data = await response.json();
        setNomeDocente(data.user.nome + ' ' + data.user.cognome);
      }else {
        // User is not logged in, redirect them
        router.push('/login');
      }
    };
  
    checkAuth();
  }, []); // Empty dependency array to run only once on component mount












  return (
    <div className={styles.proposteContainer}>
      <h2 className={styles.title}>Pagine Unitesi di {nomeDocente}</h2>
      <SearchHeader />
      <div className={styles.listProposte}>
        {pagesData.map((page, index) => (
          <PageItem
            key={index}
            name={page.name}
            members={page.members}
            studentRole={page.studentRole}
            teacherRole={page.teacherRole}
            creationDate={page.creationDate}
            url={page.url}
          />
        ))}
      </div>
      <button className={styles.addProposta}>Aggiungi Pagina</button>
      <img src="/images/comunicazione_unitesi.png" className={styles.communication}/>
    </div>
  );
}

export default ViewPages;

