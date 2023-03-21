import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthErrorCodes } from "firebase/auth";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "../../firebase";

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
      return { email, uid, username };
    } catch (error) {
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
      });
  },
});

const userReducer = userSlice.reducer;
// const { logout } = userSlice.actions;

export { userReducer, logOutUser, registerUser, loginUser, deleteUserAccount };
