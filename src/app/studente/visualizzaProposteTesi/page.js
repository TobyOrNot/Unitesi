"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './visualizzaProposte.css';
import Image from 'next/image';
import SearchBar from './searchBar.js';
import { useRouter } from 'next/navigation';

const VisualizzaProposte = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const router = useRouter();

  const [proposals, setProposals] = useState([]);

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleSearchChange2 = (newSearchTerm) => {
    setSearchTerm2(newSearchTerm);
  };

  const filteredProposals = proposals.filter(proposal => 
    proposal.titolo.toLowerCase().includes(searchTerm.toLowerCase()) &&
    proposal.docente.toLowerCase().includes(searchTerm2.toLowerCase())
  );

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
          response = await fetch(`http://localhost:3002/api/proposteTesiAll`);
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
      <h1>PROPOSTE DI TESI</h1>
      <SearchBar onSearchChange={handleSearchChange} onSearchChange2={handleSearchChange2}  />
      <ol role="list">
        {filteredProposals.map((proposal, index) => (
          <li key={index}>
            <h3>{proposal.titolo}</h3>
            <h4>{proposal.docente}</h4>
            <p>{proposal.descrizione}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default VisualizzaProposte;
