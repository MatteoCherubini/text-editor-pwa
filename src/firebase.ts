// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmJVfF0oQhVC_gHik09l_l-A8_o76BYZg",
  authDomain: "progettotesi-a0499.firebaseapp.com",
  databaseURL: "https://progettotesi-a0499-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "progettotesi-a0499",
  storageBucket: "progettotesi-a0499.appspot.com",
  messagingSenderId: "323462122062",
  appId: "1:323462122062:web:73b882b3c71fbfb674111f",
  measurementId: "G-PVMJ9W3PWG"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);