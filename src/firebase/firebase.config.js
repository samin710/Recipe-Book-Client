// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRt6bxrHnzKmdZtWzs_So5vpZknZU5cz8",
  authDomain: "recipe-book-app-379ac.firebaseapp.com",
  projectId: "recipe-book-app-379ac",
  storageBucket: "recipe-book-app-379ac.firebasestorage.app",
  messagingSenderId: "558012499863",
  appId: "1:558012499863:web:d5801dcecb089c3d8ca6d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
