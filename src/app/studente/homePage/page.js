"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './homePage.module.css';
import Image from 'next/image';



const HomePage = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const toggleAvailability = () => {
    setShowModal(true);
  };

  const confirmToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    setShowModal(false);
  };

  const cancelToggleAvailability = () => {
    setShowModal(false);
  };

  const [studentEmail, setStudentEmail] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const response = await fetch('http://localhost:3001/isAuthenticated', {
        method: 'GET',
        credentials: 'include' // Include session credentials
      });
  
      if (response.ok) {
        const data = await response.json();
        setStudentEmail(data.user.username);
      }else {
        // User is not logged in, redirect them
        router.push('/login');
      }
    };
  
    checkAuth();
  }, []); // Empty dependency array to run only once on component mount





  return (
      <div className={styles.homePageContainer}>
        
        <div className={styles.logo}>
          <Image src="/images/LogoUnitesi_NoContorni..png" className={styles.logo} width="300" height="100" />
        </div>

            <h1 className={styles.title}>Home Page</h1>
            <h3 className={styles.professore}>{studentEmail}</h3>
            
            <div className={styles.availability}>
              <div className={`${styles.statusIndicator} ${isAvailable ? styles.available : styles.notAvailable}`}></div>
              {isAvailable ? 'Disponibile per Tesi' : 'Non Disponibile per Tesi'}
            </div>

              <div className={styles.buttonContainer}>
                
                <div className={styles.modificaDisponibilità} onClick={toggleAvailability}>
                  <Image src="/images/modificaDisponibilità.png" width="70" height="70" alt="Cambia Disponibilità" className={styles.buttonImage}/>
                </div>

                <div className={styles.visualizzaPagineUnitesi}>
                  <Link href="/visualizzaPagineUnitesiDocente">
                    <Image src="/images/archivio.png" width="70" height="70" alt="Visualizza Pagine" className={styles.buttonImage}/>
                  </Link>
                </div>

                <div className={styles.comunicazione}>
                  <Link href="/comunicazione">
                    <Image src="/images/comunicazione_unitesi.png" width="70" height="70" alt="Comunicazione" className={styles.buttonImage}/>
                  </Link>
                </div>
              </div>

              {showModal && (
                <div className={styles.modalOverlay}>
                  <div className={styles.modal}>
                    <p>Sei sicuro di voler cambiare la disponibilità?</p>
                    <button onClick={confirmToggleAvailability}>Sì</button>
                    <button onClick={cancelToggleAvailability}>No</button>
                  </div>
                </div>
              )}
        
      </div>
  );
};

export default HomePage;
