"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './visualizzaProposte.css';
import Image from 'next/image';
import SearchBar from './searchBar.js';

const VisualizzaProposte = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');

  const proposals = [
    { title: 'Discovery and assessment', docente: 'Patella', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.' },
    { title: 'Information gathering and analysis', docente: 'Patella', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.' },
    { title: 'Creating your claim', docente: 'Totti', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.' },
    // Add more proposals here
  ];

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleSearchChange2 = (newSearchTerm) => {
    setSearchTerm2(newSearchTerm);
  };

  const filteredProposals = proposals.filter(proposal => 
    proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    proposal.docente.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  return (
    <div>
      <h1>PROPOSTE DI TESI</h1>
      <SearchBar onSearchChange={handleSearchChange} onSearchChange2={handleSearchChange2}  />
      <ol role="list">
        {filteredProposals.map((proposal, index) => (
          <li key={index}>
            <h3>{proposal.title}</h3>
            <h4>{proposal.docente}</h4>
            <p>{proposal.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default VisualizzaProposte;
