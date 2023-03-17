import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  deleteUser,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "veggie-menu.firebaseapp.com",
  projectId: "veggie-menu",
  storageBucket: "veggie-menu.appspot.com",
  messagingSenderId: "409349604288",
  appId: "1:409349604288:web:ff342c91a4b964418dbe25",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get authentication methods.
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
};

// export default app;
