import React, { createContext, useContext, useState, useEffect } from 'react';
<<<<<<< HEAD
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
=======
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// ─── Create or update Firestore user doc ───────────────────────────────────
const createUserDoc = async (firebaseUser, extraData = {}) => {
  const ref = doc(db, 'users', firebaseUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName || extraData.name || firebaseUser.email.split('@')[0],
      role: 'client',
      createdAt: serverTimestamp(),
      ...extraData
    });
    const newSnap = await getDoc(ref);
    return newSnap.data();
  }
  return snap.data();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // ─── Listen to Firebase auth state ───────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const ref = doc(db, 'users', firebaseUser.uid);
          const snap = await getDoc(ref);
          const firestoreData = snap.exists() ? snap.data() : {};

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firestoreData.name || firebaseUser.displayName || firebaseUser.email.split('@')[0],
            role: firestoreData.role || 'client',
            photoURL: firebaseUser.photoURL,
            ...firestoreData
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Error loading user from Firestore:', err);
          // Still authenticate with basic info if Firestore fails
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            role: 'client'
=======
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch additional user data from Firestore if needed
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};
          
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || userData.name || firebaseUser.email.split('@')[0],
            role: userData.role || 'client',
            ...userData
          });
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0]
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
          });
          setIsAuthenticated(true);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

<<<<<<< HEAD
  // ─── Sign up with Email/Password ─────────────────────────────────────────
  const signup = async (email, password, name) => {
    const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(firebaseUser, { displayName: name });
    await createUserDoc(firebaseUser, { name });
    return firebaseUser;
  };

  // ─── Login with Email/Password ───────────────────────────────────────────
  const login = async (email, password) => {
    const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
    return firebaseUser;
  };

  // ─── Login with Google ───────────────────────────────────────────────────
  const loginWithGoogle = async () => {
    try {
      console.log("AUTH: Initiating Google Sign-in...");
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const { user: firebaseUser } = await signInWithPopup(auth, provider);
      
      console.log("AUTH: Google Sign-in successful, syncing with Firestore...");
      const userData = await createUserDoc(firebaseUser);
      console.log("AUTH: Firestore sync complete.", userData);
      
      return firebaseUser;
    } catch (error) {
      console.error("AUTH: Google Sign-in error:", error.code, error.message);
      throw error;
    }
  };

  // ─── Reset password ──────────────────────────────────────────────────────
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // ─── Logout ──────────────────────────────────────────────────────────────
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
=======
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile
    await updateProfile(userCredential.user, { displayName: name });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      name,
      email,
      role: 'client',
      createdAt: new Date().toISOString()
    });
    
    return userCredential.user;
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = async () => {
    const userCredential = await signInWithPopup(auth, googleProvider);
    
    // Check if user document exists, if not create it
    const userDocRef = doc(db, 'users', userCredential.user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        name: userCredential.user.displayName,
        email: userCredential.user.email,
        role: 'client',
        createdAt: new Date().toISOString()
      });
    }
    
    return userCredential.user;
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    return signOut(auth);
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signup,
    login,
    loginWithGoogle,
    resetPassword,
    logout
  };

  // Show children only when loading is complete to avoid flash of unauthenticated content
  return (
<<<<<<< HEAD
    <AuthContext.Provider value={value}>
      {children}
=======
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user, 
      loading,
      signup,
      login, 
      loginWithGoogle,
      resetPassword,
      logout 
    }}>
      {!loading && children}
>>>>>>> 318d02ee012d758f89ea62caa95d6ee562e4c88e
    </AuthContext.Provider>
  );
};
