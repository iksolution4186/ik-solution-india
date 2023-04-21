// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa6y8cXiVeDTYFSt0VKg6seU7TetdpHvQ",
  authDomain: "admin-member-e17ff.firebaseapp.com",
  projectId: "admin-member-e17ff",
  storageBucket: "admin-member-e17ff.appspot.com",
  messagingSenderId: "619578995557",
  appId: "1:619578995557:web:eae9d16a066768472ea78c",
};

// Get Firebase auth instance

// Listen for changes in authentication state

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
