// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVELe-FSkGogHmqx_Q2bkHkiQAA7-Xjmg",
  authDomain: "mindscribe-ai.firebaseapp.com",
  projectId: "mindscribe-ai",
  storageBucket: "mindscribe-ai.appspot.com",
  messagingSenderId: "841585505932",
  appId: "1:841585505932:web:d57ecd76b5243207f8eda9",
  measurementId: "G-6L9B6D922N"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);