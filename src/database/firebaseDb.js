import { app } from "./firebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,
  query,
  deleteDoc,
} from "firebase/firestore";

// database creation
const db = getFirestore(app);

// retrieve users favorite recipes
async function fetchFavoriteRecipes(userId) {
  let favoriteRecipes = [];
  let favoritesError = "";
  const usersFavoriteRecipes = query(
    collection(db, `/users/${userId}/favorites`)
  );
  try {
    const querySnapshot = await getDocs(usersFavoriteRecipes);
    if (querySnapshot) {
      querySnapshot.forEach((snap) => {
        favoriteRecipes.push(snap.data());
      });
    }
  } catch (error) {
    favoritesError = "Unable to retrieve your favorite recipes";
  }
  return [favoriteRecipes, favoritesError];
}

// add recipe to user's favorites' list
async function addRecipe({ recipe, userId, email }, { rejectWithValue }) {
  const userRef = doc(db, `users/${userId}`);
  const favoriteRecipeRef = doc(db, `users/${userId}/favorites/${recipe.id}`);

  try {
    await setDoc(userRef, { email }, { merge: true });
    await setDoc(favoriteRecipeRef, recipe, { merge: true });
    return recipe;
  } catch (error) {
    return rejectWithValue("Recipe not added to favorites. Try again later");
  }
}

// remove recipe from user's favorites' list
async function removeRecipe({ recipe, userId }, { rejectWithValue }) {
  const recipeRef = doc(db, `users/${userId}/favorites/${recipe.id}`);
  try {
    const recipeToDelete = await getDoc(recipeRef);
    if (recipeToDelete) {
      deleteDoc(recipeRef);
      return recipe;
    }
  } catch (error) {
    return rejectWithValue("Recipe not removed. Try again later.");
  }
}

// deletes all user's favorite recipes when user deletes his/her account (it will be called inside deleteUserAccount()) which will eventually return an error.
async function deleteUserFavorites(user) {
  const favoritesCollectionRef = query(
    collection(db, `users/${user.uid}/favorites`)
  );
  const userDocRef = doc(db, `users/${user.uid}`);
  let failed = false;

  try {
    const querySnapshot = await getDocs(favoritesCollectionRef);
    if (querySnapshot) {
      querySnapshot.forEach((snap) => {
        deleteDoc(doc(db, `users/${user.uid}/favorites/${snap.data().id}`));
      });
    }
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot) {
      deleteDoc(userDocRef);
      return failed;
    }
  } catch (error) {
    failed = true;
    return failed;
  }
}

export { fetchFavoriteRecipes, addRecipe, removeRecipe, deleteUserFavorites };
