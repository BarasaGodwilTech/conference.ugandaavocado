// Firebase configuration for Uganda Avocado Conference
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB0vJdDle5OFRPlSroj9-fGcg17t1_Dno",
  authDomain: "avocado-conference.firebaseapp.com",
  projectId: "avocado-conference",
  storageBucket: "avocado-conference.firebasestorage.app",
  messagingSenderId: "926227966647",
  appId: "1:926227966647:web:26bfae5851476743783b32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, serverTimestamp, getDocs, query, orderBy };
