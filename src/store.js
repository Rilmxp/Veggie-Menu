import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./features/recipesSlice";
// import { searchFormReducer } from "./features/searchFormSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    // searchForm: searchFormReducer,
  },
});

export default store;
