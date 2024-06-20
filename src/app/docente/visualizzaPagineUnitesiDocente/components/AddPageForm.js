import React, { useState } from 'react';
import styles from './AddPageForm.css';

const AddPageForm = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [studentEmail, setStudentEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Esegui la logica per l'invio dei dati al backend (POST request al tuo server)
    const response = await fetch('http://localhost:3002/api/addPage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pageTitle, studentEmail }),
    });

    if (response.ok) {
      // In base alla risposta, puoi navigare o eseguire altre azioni
      console.log('Pagina aggiunta con successo');
      // Implementa la navigazione alla propria pagina unitesi relatore
    } else {
      console.error('Errore durante l\'aggiunta della pagina');
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3>Aggiungi Pagina</h3>
      <form onSubmit={handleSubmit}>
        <label>Titolo Pagina:</label>
        <input type="text" value={pageTitle} onChange={(e) => setPageTitle(e.target.value)} required />
        <label>Email Studente:</label>
        <input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} required />
        <button type="submit">Conferma</button>
      </form>
    </div>
  );
};

export default AddPageForm;