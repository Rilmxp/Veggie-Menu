import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  deleteUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";

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

// create the firestore
const firestore = getFirestore();

// const user = doc(firestore, "users/richard@richard");
// const userFavoriteRecipes = doc(user, "favoriteRecipes/recipe");
const favoriteRecipe = doc(firestore, "users/uid1/favorites/recipeid4");

async function addUserFavoriteRecipe() {
  const docData = { recipe: "newRecipe", id: 4 };
  try {
    // await setDoc(userFavoriteRecipes, docData);
    await setDoc(favoriteRecipe, docData);

    console.log("written to database");
  } catch (error) {
    console.log("error", error);
  }
}

async function readASingleDocument() {
  const mySnapshot = await getDoc(favoriteRecipe);
  // check if data exists then get
  if (mySnapshot.exists()) {
    const docData = mySnapshot.data();
    console.log(`my data is ${JSON.stringify(docData)}`);
  }
}

addUserFavoriteRecipe();
readASingleDocument();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
};

// export default app;
