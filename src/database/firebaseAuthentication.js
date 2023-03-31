import { app } from "./firebaseConfig";
import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  deleteUser,
} from "firebase/auth";
import { deleteUserFavorites, fetchFavoriteRecipes } from "./firebaseDb";

// get authentication methods.
const auth = getAuth(app);

// convert error given back from firebase to a much more readable string
function formatErrorMsg(errorCode) {
  switch (errorCode) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return "Email already registered. Try another one.";
    case AuthErrorCodes.INVALID_EMAIL:
      return "Invalid email.";
    case AuthErrorCodes.INVALID_PASSWORD:
      return "Wrong password. Try again.";
    case AuthErrorCodes.USER_DELETED:
      return "Invalid user. Try again. ";
    case AuthErrorCodes.CREDENTIAL_TOO_OLD_LOGIN_AGAIN:
      return "Recent login is required";
    default:
      return "Internal Error. Try again later";
  }
}

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

// delete both favorites and user data from cloud firestore and also user from firebase authentication.
// if user's data from firestore cannot be deleted, then user's deletion from firebase authentication won't be triggered.
async function deleteAccount(user, { rejectWithValue }) {
  try {
    const failed = await deleteUserFavorites(user); // cloud firestore database
    if (failed === false) {
      await deleteUser(user); // firebase authentication database
    } else {
      throw new Error();
    }
  } catch (error) {
    return rejectWithValue("User not deleted. Try again later");
  }
}

export { auth, register, login, logOut, deleteAccount };
