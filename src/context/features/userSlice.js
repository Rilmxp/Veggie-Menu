import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  register,
  login,
  logOut,
  deleteAccount,
} from "../../database/firebaseAuthentication";
import { addRecipe, removeRecipe } from "../../database/firebaseDb";

// USER INITIAL STATE //
const initialState = {
  user: null,
  favoriteRecipes: [],
  filteredFavoriteRecipes: [],
  loading: false,
  errorMessage: "",
};

// DATABASE-AUTHENTICATION  HANDLER FUNCTIONS //
const registerUser = createAsyncThunk("user/registerUser", register);
const loginUser = createAsyncThunk("user/loginUser", login);
const logOutUser = createAsyncThunk("user/logOutUser", logOut);
const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  deleteAccount
);

// DATABASE-FIRESTORE FAVORITE RECIPES HANDLER FUNCTIONS //
const addFavoriteRecipe = createAsyncThunk("user/addFavoriteRecipe", addRecipe);
const removeFavoriteRecipe = createAsyncThunk(
  "user/removeFavoriteRecipe",
  removeRecipe
);

// USER'S STATE MANAGEMENT
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    filterFavoriteRecipes: (state, action) => {
      const filters = action.payload;
      let tempRecipes = state.favoriteRecipes;
      let { calories, glutenFree, dairyFree, vegan } = filters;
      calories = parseInt(calories);

      if (calories) {
        tempRecipes = tempRecipes.filter((item) => item.calories <= calories);
      }

      if (glutenFree) {
        tempRecipes = tempRecipes.filter((item) => item.glutenFree);
      }

      if (dairyFree) {
        tempRecipes = tempRecipes.filter((item) => item.dairyFree);
      }

      if (vegan) {
        tempRecipes = tempRecipes.filter((item) => item.vegan);
      }

      state.filteredFavoriteRecipes = tempRecipes;
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
        const { email, uid, username, favoriteRecipes, favoritesError } =
          action.payload;
        state.loading = false;
        // logout if anyone else already loggedin
        state.user = null;
        state.errorMessage = "";
        if (favoritesError) state.errorMessage = favoritesError;
        state.user = { email, uid, username };
        state.favoriteRecipes = favoriteRecipes;
        state.filteredFavoriteRecipes = favoriteRecipes;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      .addCase(logOutUser.fulfilled, (state) => {
        state.favoriteRecipes = [];
        state.filteredFavoriteRecipes = [];
        state.errorMessage = "";
        state.user = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.favoriteRecipes = [];
        state.filteredFavoriteRecipes = [];
        state.errorMessage = "";
        state.user = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(addFavoriteRecipe.fulfilled, (state, action) => {
        state.favoriteRecipes.push(action.payload);
        state.filteredFavoriteRecipes = state.favoriteRecipes;
      })
      .addCase(addFavoriteRecipe.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(removeFavoriteRecipe.fulfilled, (state, action) => {
        const { id } = action.payload;
        const updatedFavRecipes = state.favoriteRecipes.filter(
          (item) => item.id !== id
        );
        state.favoriteRecipes = updatedFavRecipes;
        state.filteredFavoriteRecipes = state.favoriteRecipes;
      })
      .addCase(removeFavoriteRecipe.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

const userReducer = userSlice.reducer;
const { filterFavoriteRecipes } = userSlice.actions;

export {
  userReducer,
  filterFavoriteRecipes,
  logOutUser,
  registerUser,
  loginUser,
  deleteUserAccount,
  addFavoriteRecipe,
  removeFavoriteRecipe,
};
