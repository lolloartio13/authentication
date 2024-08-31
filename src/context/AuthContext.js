// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase';

// Crea il contesto
const AuthContext = createContext();

// Provider per il contesto dell'autenticazione
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Imposta un listener per monitorare lo stato di autenticazione
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup il listener quando il componente viene smontato
    return unsubscribe;
  }, []);

  // Crea un valore da passare ai consumatori del contesto
  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook per usare il contesto
export function useAuth() {
  return useContext(AuthContext);
}
