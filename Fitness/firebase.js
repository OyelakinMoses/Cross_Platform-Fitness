// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
const auth = getAuth(app);

import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

 
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTkRMnfVYErruNN60uH7nH3ZM3fxJUj7M",
  authDomain: "fitness-tracking-system-2025.firebaseapp.com",
  projectId: "fitness-tracking-system-2025",
  storageBucket: "fitness-tracking-system-2025.firebasestorage.app",
  messagingSenderId: "865663678618",
  appId: "1:865663678618:web:634fa63cbf511b0db58723",
  measurementId: "G-FX6HC67VCY"

  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);