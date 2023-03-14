import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    // createUser: (state, action) => {
    //     return createUserWithEmailAndPassword(auth, email, password);
    //   },
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

const userReducer = userSlice.reducer;
const { login, logout } = userSlice.actions;

export { userReducer, login, logout };
