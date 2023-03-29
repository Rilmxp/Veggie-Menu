import { initializeApp } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

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

export { app, formatErrorMsg };
