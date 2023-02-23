import axios from "axios";
import isEmpty from "lodash/isEmpty";

// base config for axios call
const baseAxiosConfig = axios.create({
  baseURL: "https://api.spoonacular.com/recipes/complexSearch?query=",
  method: "get",
  params: {
    diet: "vegeterarian",
    fillIngredients: true,
    addRecipeInformation: true,
    sort: "random",
    number: "1",
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

//fetch recipes from api, params: searchParams: string
// async function fetchRecipes(searchParams = "") {
//   try {
//     const resp = await baseAxiosConfig();
//     const formattedData = recipeDataHandler(resp.data.results);
//     return formattedData;
//   } catch (error) {}
// }

//format recipe data received from api
function recipeDataHandler(data) {
  const formattedData = data.map((item) => {
    let { id, title, image, summary, extendedIngredients } = item;
    let ingredients = extendedIngredients;

    if (isEmpty(summary)) {
      summary = "Recipe description not available";
    }

    if (!isEmpty(ingredients)) {
      // remove any ingredient repetition
      ingredients = [
        ...new Set(ingredients.map((ingredient) => ingredient.nameClean)),
      ];
    }
    return {
      id,
      title,
      image,
      summary,
      ingredients,
    };
  });
  return formattedData;
}

export { baseAxiosConfig, recipeDataHandler };
