import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseAxiosConfig, recipeDataHandler } from "../helpers";

const initialState = {
  recipes: [],
  loading: true,
};

// async call to retrieve homepage recipes on <Home/> page load
const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (httpParam) => {
    // console.log("httpParams", httpParams);
    try {
      const resp = await baseAxiosConfig(httpParam);
      const formattedData = recipeDataHandler(resp.data.results);
      return formattedData;
    } catch (error) {}
  }
);

// async call to retrieve homepage recipes on <Home/> page load
// const fetchSpecificRecipes = createAsyncThunk(
//   "recipes/fetchSpecificRecipes",
//   async () => {
//     try {
//       const resp = await baseAxiosConfig();
//       const formattedData = recipeDataHandler(resp.data.results);
//       return formattedData;
//     } catch (error) {}
//   }
// );

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
        console.log("action", action, action.payload);
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
      });
  },
});

const recipesReducer = recipesSlice.reducer;

export { fetchRecipes, recipesReducer };
