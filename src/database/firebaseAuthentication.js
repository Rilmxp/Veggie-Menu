import app from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
  deleteUser,
  AuthErrorCodes,
} from "firebase/auth";

// get authentication methods.
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  AuthErrorCodes,
};
