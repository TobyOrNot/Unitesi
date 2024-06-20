'use client'

import styles from './comunicazione.css'
import Image from 'next/image'

export default function Comunicazione() {
    return (
      <div className="emailFormContainer">
        <div className="logo">
          <Image src="/images/unitesi_logo.png" alt="App Logo" className={styles.logo} width="2000" height="2000" />
        </div>
        <h2 className="h2">Invia Comunicazione</h2>
        <form>
          <div className="formGroup">
            <label htmlFor="email">Email Destinatario:  </label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="formGroup">
            <label htmlFor="subject">Oggetto:   </label>
            <input type="text" id="subject" name="subject" required />
          </div>
          <div className="formGroup">
            <label htmlFor="message">Corpo del Messaggio:   </label>
            <br></br>
            <br></br>
            <textarea id="message" name="message" rows="10" cols="80" required></textarea>
          </div>
          <button type="submit">Invia Messaggio</button>
        </form>
      </div>
    );
  }