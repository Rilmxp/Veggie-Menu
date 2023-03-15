import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const registerUser = createAsyncThunk(
  "user/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      // const user = userCredential.user;
      await updateProfile(userCredential.user, {
        displayName: formData.username,
      });

      const user = userCredential.user;
      console.log("updateduser", user);
      const { email, uid, displayName: username } = user;
      return { email, uid, username };
    } catch (error) {
      console.log("errorcode", error.code);
      console.log("errormessage", error.message);
      return rejectWithValue("An error occured. Please try again later");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    errorMessage: "",
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log("action", action.payload);
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

const userReducer = userSlice.reducer;
const { login, logout } = userSlice.actions;

export { userReducer, login, logout, registerUser };
