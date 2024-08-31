// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Importa il file CSS
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

function Home() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Esegui il logout
      navigate('/login');   // Reindirizza l'utente alla pagina di login
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        const userDoc = doc(firestore, 'users', currentUser.uid);
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  return (
    <div className="user-profile-container">
      {userData ? (
        <div>
          <h1>Ciao, {userData.firstName} {userData.lastName}!</h1>
          <p>Email: {userData.email}</p>
          <p>Data di iscrizione: {userData.signUpDate.toDate().toLocaleDateString()}</p>
          <button onClick={handleLogout}>Log out</button>
        </div>
      ) : (
        <div className="spinner"></div>
      )}
    </div>
  );
}

export default Home;
