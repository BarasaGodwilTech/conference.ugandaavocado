// Firebase configuration for Uganda Avocado Conference
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, where, doc, getDoc, setDoc, updateDoc, deleteDoc, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-functions.js";

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDB0vJdDle5OFRPlSroj9-fGcg17t1_Dno",
  authDomain: "app.ugandaavocados.org",
  projectId: "avocado-conference",
  storageBucket: "avocado-conference.firebasestorage.app",
  messagingSenderId: "926227966647",
  appId: "1:926227966647:web:6618ccc5e2f38523783b32"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);
const functions = getFunctions(app);

export { 
  app, 
  db, 
  auth, 
  functions, 
  httpsCallable, 
  getAuth, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  deleteUser,
  sendPasswordResetEmail, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  limit 
};
