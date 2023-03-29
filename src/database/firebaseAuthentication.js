import { app, formatErrorMsg } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  deleteUser,
  AuthErrorCodes,
} from "firebase/auth";
import { deleteUserFavorites, fetchFavoriteRecipes } from "./firebaseDb";

// get authentication methods.
const auth = getAuth(app);

// creates account and adds username as per user input
async function register(formData, { rejectWithValue }) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    await updateProfile(userCredential.user, {
      displayName: formData.username,
    });

    const user = userCredential.user;
    const { email, uid, displayName: username } = user;
    return { email, uid, username };
  } catch (error) {
    return rejectWithValue(formatErrorMsg(error.code));
  }
}

// login users and retrive their favorite recipes. if unable to retrieve favorites, it will not return an error so user can still login but won't be able to see favorites
async function login(formData, { rejectWithValue }) {
  let email, uid, username;

  // login user from firebase authentication
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = userCredential.user;
    email = user.email;
    uid = user.uid;
    username = user.displayName;
  } catch (error) {
    return rejectWithValue(formatErrorMsg(error.code));
  }
  // fetch favorite recipes from firestore
  let [favoriteRecipes, favoritesError] = await fetchFavoriteRecipes(uid);
  return { email, uid, username, favoriteRecipes, favoritesError };
}

// logout user
async function logOut(user, { rejectWithValue }) {
  try {
    await signOut(user);
  } catch (error) {
    return rejectWithValue(formatErrorMsg(error.code));
  }
}

// delete both favorites and user data from cloud firestore and also user from Auth.
// if user's data from firestore cannot be deleted, then the user from authentication want be deleted either.
async function deleteAccount(user, { rejectWithValue }) {
  try {
    await deleteUserFavorites(user); // cloud firestore database
    await deleteUser(user); // firebase authentication database
  } catch (error) {
    return rejectWithValue("User not deleted. Try again later");
  }
}

export { auth, register, login, logOut, deleteAccount };
