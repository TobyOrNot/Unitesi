"use client"

import React, { useState, useEffect } from 'react';
import styles from './ViewPages.module.css';
import PageItem from './components/PageItem';
import SearchHeader from './components/searchHeader';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function ViewPages() {
  const [pagesCorrelatore, setPagesCorrelatore] = useState([]);
  const [nomeCollaboratore, setNomeCollaboratore] = useState('');
  const [emailCollaboratore, setEmailCollaboratore] = useState('');

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/isAuthenticated', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setNomeCollaboratore(data.user.nome + ' ' + data.user.cognome);
          setEmailCollaboratore(data.user.username);
          loadPagesCorrelatore(data.user.username);

        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };
    checkAuth();
  }, [router]);

  const loadPagesCorrelatore = async (emailCollaboratore) => {
    try {
      const response = await fetch(`http://localhost:3002/api/pagineunitesi/correlatore/${emailCollaboratore}`);
      if (!response.ok) {
        throw new Error('Failed to load pages');
      }
      const data = await response.json();
      console.log(data);
      setPagesCorrelatore(data);
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  };

  return (
    <div className={styles.proposteContainer}>

      
      <h2 className={styles.title}>Pagine Unitesi di {nomeCollaboratore}</h2>

      <div className={styles.buttonContainer}>
        <div className={styles.home}>
            <Link href="/login">
              <Image src="/images/home_page.png" width="70" height="70" alt="Return home" className={styles.buttonImage}/>
            </Link>
          </div>
        </div>
      <SearchHeader />

      <div className={styles.listProposte}>
        {pagesCorrelatore.map((page, index) => (
          <PageItem
            key={index}
            name={page.titolo}
            ruolo ={"Correlatore"}
            descrizione={page.descrizione}
            url={`/collaboratore/paginaUnitesiCorrelatore?id=${page._id}`}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.communication}>
            <Link href="/comunicazione">
              <Image src="/images/comunicazione_icon.png" width="70" height="70" alt="Comunicazione" className={styles.buttonImage}/>
            </Link>
          </div>
        </div>
    </div>
  );
}

export default ViewPages;
