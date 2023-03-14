import { configureStore } from "@reduxjs/toolkit";
import { recipesReducer } from "./features/recipesSlice";
import { userReducer } from "./features/userSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    user: userReducer,
  },
});

export default store;
