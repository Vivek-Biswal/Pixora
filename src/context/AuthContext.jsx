import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const { user: firebaseUser } = await signInWithPopup(auth, provider);
    await createUserDoc(firebaseUser);
    return firebaseUser;
  };

  // ─── Reset password ──────────────────────────────────────────────────────
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // ─── Logout ──────────────────────────────────────────────────────────────
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
