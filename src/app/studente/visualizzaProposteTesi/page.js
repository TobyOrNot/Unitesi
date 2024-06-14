"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './visualizzaProposte.css';
import Image from 'next/image';

const VisualizzaProposte = () => {
  return (
    <ol style={{ '--length': 5 }} role="list">
      <li style={{ '--i': 5 }}>
        <h3>Discovery and assessment</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li style={{ '--i': 2 }}>
        <h3>Information gathering and analysis</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li style={{ '--i': 3 }}>
        <h3>Creating your claim</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li style={{ '--i': 4 }}>
        <h3>Approvals and submission</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li style={{ '--i': 5 }}>
        <h3>Receiving your benefit</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li style={{ '--i': 5 }}>
        <h3>Receiving your benefit</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li style={{ '--i': 5 }}>
        <h3>Receiving your benefit</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
    </ol>
  );
};

export default VisualizzaProposte;
