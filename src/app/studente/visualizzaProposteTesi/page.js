"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './visualizzaProposte.css';
import Image from 'next/image';

const VisualizzaProposte = () => {
  return (
    <ol role="list">
    <h1>PROPOSTE DI TESI</h1>
      <li>
        <h3>Discovery and assessment</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li>
        <h3>Information gathering and analysis</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li>
        <h3>Creating your claim</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li>
        <h3>Approvals and submission</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
      <li>
        <h3>Receiving your benefit</h3>
        <h4>Docente:</h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus.</p>
      </li>
    </ol>
  );
};

export default VisualizzaProposte;
