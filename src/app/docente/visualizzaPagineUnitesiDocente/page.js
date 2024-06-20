"use client"

import React, { useState, useEffect } from 'react';
import styles from './ViewPages.module.css';
import PageItem from './components/PageItem';
import SearchHeader from './components/searchHeader';
import { useRouter } from 'next/navigation';

function ViewPages() {
  const [pagesRelatore, setPagesRelatore] = useState([]);
  const [pagesCorrelatore, setPagesCorrelatore] = useState([]);
  const [nomeDocente, setNomeDocente] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [emailDocente, setEmailDocente] = useState('');
  const [newPage, setNewPage] = useState({
    titolo: '',
    descrizione: '',
    studenteEmail: '',
    studenteType: ''
  });

  const router = useRouter();

  const handleAddPage = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/isAuthenticated', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();

          setNomeDocente(data.user.nome + ' ' + data.user.cognome);
          setEmailDocente(data.user.username);
          loadPagesRelatore(data.user.username);
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

  const loadPagesRelatore = async (docenteEmail) => {
    try {
      const response = await fetch(`http://localhost:3002/api/pagineunitesi/relatore/${docenteEmail}`);
      if (!response.ok) {
        throw new Error('Failed to load pages');
      }
      const data = await response.json();
      setPagesRelatore(data);
    } catch (error) {
      console.error('Error loading pages:', error);
    }
  };

  const loadPagesCorrelatore = async (docenteEmail) => {
    try {
      const response = await fetch(`http://localhost:3002/api/pagineunitesi/correlatore/${docenteEmail}`);
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



  const handleConfirmAddPage = async () => {
    try {
      const pageData = {
        titolo: newPage.titolo,
        descrizione: newPage.descrizione,
        studenteEmail: newPage.studenteEmail,
        relatoreEmail: emailDocente,
      };

      const response = await fetch('http://localhost:3002/api/addPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const paginaUnitesi = await response.json();
      console.log('Pagina successfully added:', paginaUnitesi);

      setShowAddModal(false); // Chiudi il modal dopo l'aggiunta
      setNewPage({ titolo: '', descrizione: '', studenteEmail: '' }); // Resetta i campi del form
      loadPagesRelatore(emailDocente); // Ricarica le pagine dopo l'aggiunta
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelAddPage = () => {
    setShowAddModal(false);
    setNewPage({ titolo: '', descrizione: '', studenteEmail: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPage((prevPage) => ({ ...prevPage, [name]: value }));
  };

  function emailToName(email) {
    const [username, domain] = email.split('@');
    const [firstName, lastName] = username.split('.');
    
    const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    
    return `${formattedFirstName} ${formattedLastName}`;
 }

  return (
    <div className={styles.proposteContainer}>
      <h2 className={styles.title}>Pagine Unitesi di {nomeDocente}</h2>

      <SearchHeader />

      <div className={styles.listProposte}>
        {pagesRelatore.map((page, index) => (
          <PageItem
            key={index}
            name={page.titolo}
            ruolo ={"Relatore"}
            descrizione={page.descrizione}
            url={`/docente/paginaUnitesiRelatore?id=${page._id}`}
          />
        ))}
        {pagesCorrelatore.map((page, index) => (
          <PageItem
              key={index}
              name={page.titolo}
              ruolo ={"Correlatore"}
              descrizione={page.descrizione}
            url={`/docente/paginaUnitesiCorrelatore?id=${page._id}`}
          />
        ))}
      </div>
  

      <button className={styles.addProposta} onClick={handleAddPage}>
        Aggiungi Pagina
      </button>

      {showAddModal && (
        <div className={styles.modalBackground}>
          <div className={styles.modalContainer}>
            <label>Titolo</label>
            <input
              type="text"
              name="titolo"
              value={newPage.titolo}
              onChange={handleChange}
            />

            <label>Descrizione</label>
            <input
              type="text"
              name="descrizione"
              value={newPage.descrizione}
              onChange={handleChange}
            />

            <label>E-mail Studente</label>
            <input
              type="text"
              name="studenteEmail"
              value={newPage.studenteEmail}
              onChange={handleChange}
            />

            <button onClick={handleConfirmAddPage}>Conferma dati</button>
            <button onClick={handleCancelAddPage}>Annulla</button>
          </div>
        </div>
      )}
      <img src="/images/comunicazione_icon.png" className={styles.communication} />
    </div>
  );
}

export default ViewPages;
