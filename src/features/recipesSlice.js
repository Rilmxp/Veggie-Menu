import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { baseAxiosConfig, recipeDataHandler } from "../helpers";

const initialState = {
  recipes: [],
  previousRecipes: [],
  loading: true,
  errorMessage: "",
};

// async call to retrieve recipes, params: userInput = string (user's search input)
const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (userInput, { rejectWithValue }) => {
    try {
      const resp = await baseAxiosConfig(userInput);
      const formattedData = recipeDataHandler(resp.data.results);
      return formattedData;
    } catch (error) {
      return rejectWithValue(
        "Recipes data currently unavailable. Please try again later"
      );
    }
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    loadPreviousRecipes: (state) => {
      if (!isEmpty(state.previousRecipes)) {
        state.errorMessage = "";
        state.recipes = state.previousRecipes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.previousRecipes = state.recipes;
        state.recipes = action.payload;
        if (isEmpty(state.recipes)) {
          state.errorMessage =
            "No recipes available with that criteria. Please try something else";
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

const recipesReducer = recipesSlice.reducer;
const { loadPreviousRecipes } = recipesSlice.actions;

export { fetchRecipes, recipesReducer, loadPreviousRecipes };
