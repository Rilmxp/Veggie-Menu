// https://blog.miguelgrinberg.com/post/the-react-mega-tutorial-chapter-6-building-an-api-client

import { baseAxiosConfig } from "../axios/baseAxiosConfig";

const SpoonacularApiClient = ({ endpoint }) => {
  const requestParam = endpoint;
  async function request(requestParam) {
    const resp = await baseAxiosConfig(userInput);
  }
};

export default SpoonacularApiClient;

/*
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
  */
