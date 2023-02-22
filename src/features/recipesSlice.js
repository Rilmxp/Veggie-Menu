import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import isEmpty from "lodash/isEmpty";
import parse from "html-react-parser";

const initialState = {
  recipes: [],
  loading: true,
};

// base config for axios call
const baseAxiosConfig = axios.create({
  baseURL: "https://api.spoonacular.com/recipes/complexSearch?diet=vegetarian",
  method: "get",
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

// async call to retrieve homepage recipes on <Home/> page load
const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", async () => {
  try {
    const resp = await baseAxiosConfig(
      "/&addRecipeInformation=true&fillIngredients=true&number=1"
    );
    console.log("resp", resp.data.results);
    const data = resp.data.results;

    const formattedData = data.map((item) => {
      let { id, title, image, summary, extendedIngredients } = item;
      let ingredients = extendedIngredients;

      if (isEmpty(summary)) {
        summary = "Recipe description not available";
      }
      // else {
      //   summary = parse(summary);
      // }

      if (!isEmpty(ingredients)) {
        // remove any ingredient repetition
        ingredients = [
          ...new Set(ingredients.map((ingredient) => ingredient.nameClean)),
        ];

        // create list of ingredients to display
        // ingredients = uniqueIngredients.map((ingredient, index) => {
        //   return <li key={index}>{ingredient}</li>;
        // });
      }
      return {
        id,
        title,
        image,
        summary,
        ingredients,
      };
    });
    // return resp.data.results;
    return formattedData;
  } catch (error) {}
});

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
      })
      .addCase(fetchRecipes.rejected, (state) => {
        state.loading = false;
      });
  },
});

const recipesReducer = recipesSlice.reducer;

export { fetchRecipes, recipesReducer };
