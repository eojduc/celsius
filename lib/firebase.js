import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBsC0gXTLqVUn0GGFgPHQG-IK11iF5BRA",
  authDomain: "celsius-bbf35.firebaseapp.com",
  projectId: "celsius-bbf35",
  storageBucket: "celsius-bbf35.appspot.com",
  messagingSenderId: "1077510880187",
  appId: "1:1077510880187:web:08dcdbfd71703b18f1a29e",
  measurementId: "G-MQL7YN8CPQ",
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);