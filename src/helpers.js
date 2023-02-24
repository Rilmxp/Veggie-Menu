import axios from "axios";
import isEmpty from "lodash/isEmpty";

// base config for axios call
const baseAxiosConfig = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  method: "get",
  params: {
    diet: "vegetarian",
    fillIngredients: true,
    addRecipeInformation: true,
    sort: "random",
    number: "1",
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

//format recipe data received from api. img (ant its default) will be handled directly in <RecipeCard/>
function recipeDataHandler(data) {
  const formattedData = data.map((item) => {
    let { id, title, image, summary, extendedIngredients } = item;
    let ingredients = extendedIngredients;

    if (isEmpty(title)) {
      title = "Recipe title not available";
    }

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
