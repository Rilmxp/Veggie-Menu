import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import { baseAxiosConfig, recipeDataHandler } from "../../helpers";

const initialState = {
  recipes: [],
  previousRecipes: [],
  filteredRecipes: [],
  loading: true,
  errorMessage: "",
};

// async call to retrieve recipes from Spoonacular API, params: userInput = string (user's search input)
const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (userInput, { rejectWithValue }) => {
    try {
      const resp = await baseAxiosConfig(userInput);
      const formattedData = recipeDataHandler(resp.data.results);
      return formattedData;
    } catch (error) {
      return rejectWithValue(
        "Recipes data currently unavailable. Please try again later."
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
    filterRecipes: (state, action) => {
      const filters = action.payload;
      let tempRecipes = state.recipes;
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

      state.filteredRecipes = tempRecipes;
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
        state.filteredRecipes = state.recipes;
        if (isEmpty(state.recipes)) {
          state.errorMessage =
            "No recipes available with those search parameters.";
        }
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

const recipesReducer = recipesSlice.reducer;
const { loadPreviousRecipes, filterRecipes } = recipesSlice.actions;

export { fetchRecipes, recipesReducer, loadPreviousRecipes, filterRecipes };
