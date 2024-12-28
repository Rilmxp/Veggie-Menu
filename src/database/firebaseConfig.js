import { initializeApp } from "firebase/app";

// apiKey for local server you can't use env variable. You must insert apiKey literally. You find it in the Firebase website.
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

export { app };
