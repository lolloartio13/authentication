// src/components/Register.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from '../Firebase'; // Assicurati di importare Firestore
import '../styles/Login.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Crea l'utente con email e password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Aggiorna il profilo dell'utente con nome e cognome
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });

      // Ottieni la data corrente
      const signUpDate = new Date();

      // Aggiungi i dati dell'utente a Firestore, inclusa la data di iscrizione
      await setDoc(doc(firestore, 'users', user.uid), {
        firstName,
        lastName,
        email,
        signUpDate, // Aggiungi la data di iscrizione
      });

      navigate('/login');
    } catch (error) {
      setError('Errore nella registrazione: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registrazione</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">Nome</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName">Cognome</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Registrati</button>
        </form>
        <p className="signup-text">Hai già un account? <a href="/login">Accedi qui</a></p>
      </div>
    </div>
  );
};

export default Register;
