import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();  // Usa il contesto dell'autenticazione
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // Esempio di redirezione
    } catch (error) {
      setError('Errore nell\'autenticazione: ' + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verifica se l'utente è già presente nel Firestore
      const userDocRef = doc(firestore, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // Se l'utente è nuovo, aggiungilo a Firestore
        const signUpDate = new Date();
        const [firstName, lastName] = user.displayName.split(' ');

        await setDoc(userDocRef, {
          firstName,
          lastName,
          email: user.email,
          signUpDate, // Aggiungi la data di iscrizione
        });
      }

      navigate('/home'); // Esempio di redirezione
    } catch (error) {
      setError('Errore nell\'autenticazione con Google: ' + error.message);
    }
  };

  // Esempio di accesso allo stato corrente dell'utente
  if (currentUser) {
    return <p>Sei già loggato come {currentUser.email}</p>;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button">Login</button>
        </form>

        <div className="separator">Oppure</div>

        <button onClick={handleGoogleSignIn} className="google-signin-button">
          <img src="https://th.bing.com/th/id/R.16597b58fb4d4fa8ebcf5a013fc19b0a?rik=a0DcRRp3bMzLow&pid=ImgRaw&r=0" alt="Google icon" />
        </button>

        <p className="signup-text">Non hai un account? <a href="/register">Registrati qui</a></p>
      </div>
    </div>
  );
};

export default Login;
