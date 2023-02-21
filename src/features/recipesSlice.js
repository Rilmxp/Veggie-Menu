import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  isLoading: true,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
});

console.log(recipesSlice);

export default recipesSlice.reducer;
