import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { baseAxiosConfig, recipeDataHandler } from "../helpers";

const initialState = {
  recipes: [],
  loading: true,
  errorMessage: "",
};

// async call to retrieve recipes, params: userInput = string (user's search input)
const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (userInput, { rejectWithValue }) => {
    try {
      const resp = await baseAxiosConfig(userInput);
      console.log("original response", resp);
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
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

export { fetchRecipes, recipesReducer };
