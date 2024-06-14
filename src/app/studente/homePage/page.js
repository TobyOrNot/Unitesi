"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './homePage.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const HomePage = () => {
  const router = useRouter();

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


  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include' // Include session credentials
    });
  
    if (response.ok) {
      // User is logged out, redirect them
      router.push('/login');
    } else {
      console.error('Logout failed');
    }
  };



  return (
      <div className={styles.homePageContainer}>
        
        <div className={styles.logo}>
          <Image src="/images/LogoUnitesi_NoContorni.png" className={styles.logo} width="300" height="100" />
        </div>

            <h1 className={styles.title}>Home Page</h1>
            <h3 className={styles.professore}>{studentEmail}</h3>
            
              <div className={styles.buttonContainer}>
                
                <div className={styles.modificaDisponibilità}>\
                <Link href="/studente/visualizzaProposteTesi">
                  <Image src="/images/ProposteTesi.png" width="70" height="70" alt="Visualizza Proposte Tesi" className={styles.buttonImage}/>
                </Link>
                </div>

                <div className={styles.comunicazione}>
                  <Link href="/comunicazione">
                    <Image src="/images/comunicazione_unitesi.png" width="70" height="70" alt="Comunicazione" className={styles.buttonImage}/>
                  </Link>
                </div>
              </div>
              <button className="logout-button" onClick={handleLogout}>
                 Logout
              </button>
        
      </div>
  );
};

export default HomePage;
