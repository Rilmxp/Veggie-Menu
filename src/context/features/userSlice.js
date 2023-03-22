import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
  AuthErrorCodes,
} from "../../database/firebaseAuthentication";
import {
  db,
  doc,
  setDoc,
  collection,
  getDoc,
  getDocs,
} from "../../database/firebaseDb";

// USER-AUTHENTICATION HANDLER FUNCTIONS //
const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
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
);

const loginUser = createAsyncThunk(
  "user/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const { email, uid, displayName: username } = user;

      // NEW ADDED //
      // console.log("new added");
      // const docRef = doc(db, `users/${uid}`);
      // console.log("docRef", docRef);
      // const snapshot = await getDocs(docRef);
      // console.log("snapshot", snapshot);
      // if (snapshot.exists()) {
      //   const docData = snapshot.data();
      //   console.log(`my data is ${JSON.stringify(docData)}`);
      // } else {
      //   console.log("doesn't exist");
      // }
      const querySnapshot = await getDocs(collection(db, "users"));
      console.log("querySnapshot", querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
      });

      ///////////////////
      return { email, uid, username };
    } catch (error) {
      console.log(error);
      return rejectWithValue(formatErrorMsg(error.code));
    }
  }
);

const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (user, { rejectWithValue }) => {
    try {
      await signOut(user);
    } catch (error) {
      console.log(error);
      return rejectWithValue(formatErrorMsg(error.code));
    }
  }
);

const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (user, { rejectWithValue }) => {
    try {
      await deleteUser(user);
    } catch (error) {
      console.log(error);
      return rejectWithValue(formatErrorMsg(error.code));
    }
  }
);

// USER FAVORITE RECIPES HANDLER FUNCTIONS //

const addFavoriteRecipe = createAsyncThunk(
  "user/addFavoriteRecipe",
  async ({ recipe, userId }, { rejectWithValue }) => {
    const favoriteRecipePath = doc(
      db,
      `users/${userId}/favorites/${recipe.id}`
    );
    try {
      await setDoc(favoriteRecipePath, recipe);
      return recipe;
    } catch (error) {
      console.log(error);
      return rejectWithValue(formatErrorMsg(error.code));
    }
  }
);

//////////////////////////////

// convert error to human friendly string
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

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    favoriteRecipes: [],
    loading: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // logout if anyone else already loggedin
        state.user = null;
        state.errorMessage = "";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        console.log("logout");
        state.errorMessage = "";
        state.user = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        console.log("account deleted");
        state.errorMessage = "";
        state.user = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
        console.log("recipeAddedtoDb");
        console.log("action.payload", action.payload);
        state.favoriteRecipes.push(action.payload);
        console.log("favoriteRecipes State", state.favoriteRecipes);
      })
      .addCase(addFavoriteRecipe.rejected, (state, action) => {
        console.log("NOT ADDED TO DB");
        state.errorMessage = action.payload;
      });
  },
});

const userReducer = userSlice.reducer;
// const { logout } = userSlice.actions;

export {
  userReducer,
  logOutUser,
  registerUser,
  loginUser,
  deleteUserAccount,
  addFavoriteRecipe,
};
