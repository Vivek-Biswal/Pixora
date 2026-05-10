import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  // Simulate checking for a saved session
  useEffect(() => {
    const savedSession = localStorage.getItem('pixora_auth');
    if (savedSession) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedSession));
    }
  }, []);

  const login = (email) => {
    setIsAuthenticated(true);
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    localStorage.setItem('pixora_auth', JSON.stringify(userData));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('pixora_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
