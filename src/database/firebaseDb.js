import app from "./firebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

// create the firestore
// const firestore = getFirestore();
const db = getFirestore(app);

// const user = doc(firestore, "users/richard@richard");
// const userFavoriteRecipes = doc(user, "favoriteRecipes/recipe");
const favoriteRecipe = doc(db, "users/uid1/favorites/recipeid4");

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
  const docRef = doc(
    db,
    "users",
    "c3ptOz6OjnWPJKjXDHHAQBE4qNK2",
    "favorites",
    "636754"
  );
  console.log("docRef", docRef);
  const docSnap = await getDoc(docRef);
  console.log("docSnap", docSnap);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  // console.log("snapshot", mySnapshot);
  // // check if data exists then get
  // if (mySnapshot.exists()) {
  //   const docData = mySnapshot.data();
  //   console.log(`my data is ${JSON.stringify(docData)}`);
  // }
}

// addUserFavoriteRecipe();
readASingleDocument();

export { db, doc, setDoc, collection, getDocs, getDoc };
