import app from "./firebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
  collectionGroup,
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
}

async function getFavoriteRecipes() {
  try {
    const recipesQuery = query(
      collection(db, "users")
      // where("id", "==", 661260)
    );
    const querySnapshot = await getDocs(recipesQuery);
    // const allDocs = querySnapshot.docs();
    // console.log("allDocs", allDocs);
    console.log("querySnapshot", querySnapshot);
    const allDocs = querySnapshot.forEach((snap) => {
      console.log(snap.data()); // get the object
      console.log(
        `Document ${snap.id} contains ${JSON.stringify(snap.data())}`
      ); // get a stringlike object
    });
  } catch (error) {
    console.log(error);
  }
}

// addUserFavoriteRecipe();
// readASingleDocument();
// getFavoriteRecipes();

export { db, doc, setDoc, collection, getDocs, getDoc, query };
