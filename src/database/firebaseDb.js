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
  deleteDoc,
} from "firebase/firestore";

// create the firestore
// const firestore = getFirestore();
const db = getFirestore(app);

// const user = doc(firestore, "users/richard@richard");
// const userFavoriteRecipes = doc(user, "favoriteRecipes/recipe");
// const favoriteRecipe = doc(db, "users/uid1/favorites/recipeid4");

// async function addUserFavoriteRecipe() {
//   const docData = { recipe: "newRecipe", id: 4 };
//   try {
//     // await setDoc(userFavoriteRecipes, docData);
//     await setDoc(favoriteRecipe, docData);
//     console.log("written to database");
//   } catch (error) {
//     console.log("error", error);
//   }
// }

// async function readASingleDocument() {
//   const docRef = doc(
//     db,
//     "users",
//     "c3ptOz6OjnWPJKjXDHHAQBE4qNK2",
//     "favorites",
//     "636754"
//   );
//   console.log("docRef", docRef);
//   const docSnap = await getDoc(docRef);
//   console.log("docSnap", docSnap);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }

// async function getFavoriteRecipes() {
//   try {
//     const recipesQuery = query(
//       collection(db, "users")
//       // where("id", "==", 661260)
//     );
//     const querySnapshot = await getDocs(recipesQuery);
//     // const allDocs = querySnapshot.docs();
//     // console.log("allDocs", allDocs);
//     console.log("querySnapshot", querySnapshot);
//     const allDocs = querySnapshot.forEach((snap) => {
//       console.log(snap.data()); // get the object
//       console.log(
//         `Document ${snap.id} contains ${JSON.stringify(snap.data())}`
//       ); // get a stringlike object
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

async function addRecipe({ recipe, userId, email }, { rejectWithValue }) {
  const userRef = doc(db, `users/${userId}`);
  const favoriteRecipeRef = doc(db, `users/${userId}/favorites/${recipe.id}`);

  try {
    await setDoc(userRef, { email }, { merge: true });
    await setDoc(favoriteRecipeRef, recipe, { merge: true });
    return recipe;
  } catch (error) {
    console.log(error);
    // return rejectWithValue(formatErrorMsg(error.code));
    return rejectWithValue(error.code);
  }
}

async function removeRecipe({ recipe, userId }, { rejectWithValue }) {
  const recipeRef = doc(db, `users/${userId}/favorites/${recipe.id}`);
  try {
    const recipeToDelete = await getDoc(recipeRef);
    if (recipeToDelete) {
      deleteDoc(recipeRef);
      return recipe;
    }
  } catch (error) {
    return rejectWithValue(error.code);
  }
}

async function deleteUserFavorites({ user }, { rejectWithValue }) {
  const favoritesCollectionRef = collection(db, `users/${user.uid}/favorites`);
  const userDocRef = doc(db, `users/${user.uid}`);

  try {
    const querySnapshot = await getDocs(favoritesCollectionRef);
    if (querySnapshot) {
      querySnapshot.forEach((snap) => {
        console.log(snap.data());
        console.log(snap.data().id);
        deleteDoc(doc(db, `users/${user.uid}/favorites/${snap.data().id}`));
      });
    }
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot) {
      console.log(userSnapshot.data());
      deleteDoc(userDocRef);
    }
  } catch (error) {
    return rejectWithValue("User not deleted. Try again later");
  }
}

// addUserFavoriteRecipe();
// readASingleDocument();
// getFavoriteRecipes();
// deleteUserFavorites();

export {
  db,
  doc,
  setDoc,
  collection,
  getDocs,
  getDoc,
  query,
  addRecipe,
  deleteUserFavorites,
  removeRecipe,
};
