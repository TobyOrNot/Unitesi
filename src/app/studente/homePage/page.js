"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './homePage.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';



const HomePage = () => {
  const router = useRouter();

  const [studentEmail, setStudentEmail] = useState('');
  const [paginaId, setPaginaId] = useState(null);

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

        // Fetch per verificare la pagina unitesi dello studente
          const fetchPaginaUnitesi = async () => {
            
              try {
                  const response = await fetch(`http://localhost:3002/api/paginaUnitesi/studente/${data.user.username}`);
                  if (response.ok) {
                      const data = await response.json();
                      console.log(data.paginaUnitesiId)
                      setPaginaId(data.paginaUnitesiId);
                  } else {
                      console.error('Pagina unitesi non trovata per lo studente');
                  }
              } catch (error) {
                  console.error('Errore durante il fetch della pagina unitesi:', error);
              }
          };

            fetchPaginaUnitesi();
        } else {
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
      <div className="homePageContainer">
        
        <div className="logo">
          <Image src="/images/unitesi_logo.png" className={styles.logo} width="300" height="100" />
        </div>

            <h1 className="title">Home Page</h1>
            <h3 className="professore">{studentEmail}</h3>
            
              <div className="buttonContainer">
                
                <div className="modificaDisponibilità">
                <Link href="/studente/visualizzaProposteTesi">
                  <Image src="/images/ProposteTesi.png" width="70" height="70" alt="Visualizza Proposte Tesi" className={styles.buttonImage}/>
                </Link>
                </div>

                <div className="comunicazione">
                  <Link href="/comunicazione">
                    <Image src="/images/comunicazione_icon.png" width="70" height="70" alt="Comunicazione" className={styles.buttonImage}/>
                  </Link>
                </div>

                {paginaId && (
                <div className="modificaDisponibilità">  
                    <Link href={`/studente/paginaUnitesiStudente?id=${paginaId}`}>
                        <Image src="/images/unitesi_studente.png" width="70" height="70" alt="PaginaUnitesi" className={styles.buttonImage} />
                    </Link>
                </div>
            )}
              </div>
              <button className="logout-button" onClick={handleLogout}>
                 Logout
              </button>
        
      </div>
  );
};

export default HomePage;
