import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./features/recipesSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

export default store;
