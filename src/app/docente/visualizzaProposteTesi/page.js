"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './visualizzaProposte.css';
import Image from 'next/image';
import SearchBar from './searchBar.js';
import { useRouter } from 'next/navigation';

const VisualizzaProposte = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [proposals, setProposals] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newProposal, setNewProposal] = useState({ titolo: '', descrizione: '', docente: '' });
  const router = useRouter();


  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleAddProposal = () => {
    setShowPopup(true);
  };

  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    setNewProposal({ ...newProposal, [name]: value, docente: emailDocente });
  };


  const handleConfirmProposal = async (newProposal) => {
    try {
        const response = await fetch('http://localhost:3002/api/proposteTesi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProposal),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const propostaTesi = await response.json();
        console.log('Proposal successfully added:', propostaTesi);
    } catch (error) {
        console.error('Error:', error);
    }
};

  const filteredProposals = proposals.filter(proposal => 
    proposal.titolo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [emailDocente, setEmailDocente] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        let response = await fetch('http://localhost:3001/isAuthenticated', {
          method: 'GET',
          credentials: 'include' // Include session credentials
        });
  
        if (response.ok) {
          let data = await response.json();
          /* if(data.user.role !== 'docente'){
            router.push('/studente/homePage');
          }
          */
          setEmailDocente(data.user.cognome);
          console.log(data.user.cognome);
          response = await fetch(`http://localhost:3002/api/proposteTesi/${data.user.cognome}`);
          data = await response.json();
          setProposals(data);
          console.log(data)
        } else {
          // User is not logged in, redirect them
          router.push('/login');
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };
  
    checkAuth();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div>
      <h1>LE MIE PROPOSTE DI TESI</h1>
      <SearchBar onSearchChange={handleSearchChange} />
      <button className='bottone' onClick={handleAddProposal}>Aggiungi nuova proposta</button>
      <ol role="list">
        {filteredProposals.map((proposal, index) => (
          <li key={index}>
            <h3>{proposal.titolo}</h3>
            <h4>{proposal.docente}</h4>
            <p>{proposal.descrizione}</p>
          </li>
        ))}
      </ol>
      {showPopup && (
        <div className="popup">
          <h2>Aggiungi Nuova Proposta</h2>
          <label>
            Titolo
            <input
              type="text"
              name="titolo"
              value={newProposal.title}
              onChange={handlePopupChange}
            />
          </label>
          <label>
            Descrizione
            <textarea
              name="descrizione"
              value={newProposal.description}
              onChange={handlePopupChange}
            />
          </label>
          <button onClick={() => handleConfirmProposal(newProposal)}>Conferma</button>
          <button onClick={() => setShowPopup(false)}>Cancella</button>
        </div>
      )}
    </div>
  );
};

export default VisualizzaProposte;
