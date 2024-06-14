'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import Image from 'next/image';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();


  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const response = await fetch('http://localhost:3001/isAuthenticated', {
        method: 'GET',
        credentials: 'include' // Include session credentials
      });

      if (response.ok) {
        // User is already logged in, redirect them
        const data = await response.json();
        if (data.user.ruolo === 'Studente') {
          router.push('/studente/homePage');
        } else if (data.user.ruolo === 'Docente') {
          router.push('/docente/homePage');
        } else if (data.user.ruolo === 'Correlatore') {
          router.push('/correlatore');
        }
      }
    };

    checkAuth();
  }, []); // Empty dependency array to run only once on component mount


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Logging in');

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include' // Include session credentials
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);

        // Redirect based on role
        if (data.user.ruolo === 'Studente') {
          router.push('/studente/homePage');
        } else if (data.user.ruolo === 'Docente') {
          router.push('/docente/homePage');
        } else if (data.user.ruolo === 'Correlatore') {
          router.push('/correlatore');
        }
      } else {
        // Login failed
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again later.');
    }
  };








  return (
    <div className={styles.body}>
      <Image src="/images/LogoUnitesi_NoContorni.png" className={styles.image2} width="2000" height="2000" />
      <div className={styles.container}>
        <Image src="/images/Group.png" className={styles.image1} width="355" height="355" />
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className='input1'
              type="text"
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className='input2'
              type="password"
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className={styles.button} type="submit">Accedi</button>
          <br></br>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
