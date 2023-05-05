import axios from "axios";

// base config for axios call
const baseAxiosConfig = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  method: "get",
  params: {
    diet: "vegetarian",
    // fillIngredients: true,
    // addRecipeInformation: true,
    addRecipeNutrition: true,
    // sort: "random",
    number: "1",
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

export default baseAxiosConfig;
