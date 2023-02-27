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
    minCalories: "0",
    number: "1",
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

//format recipe data received from api. img (ant its default) will be handled directly in <RecipeCard/>
function recipeDataHandler(data) {
  const formattedData = data.map((item) => {
    let {
      id,
      title,
      image,
      summary,
      extendedIngredients,
      dairyFree,
      glutenFree,
      vegan,
      veryHealthy,
      veryPopular,
      sustainable,
      cheap,
      nutrition,
    } = item;
    let ingredients = extendedIngredients;

    console.log("fullRecipe", item);

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

    const calories = Math.round(nutrition.nutrients[0].amount);

    return {
      id,
      title,
      image,
      summary,
      ingredients,
      dairyFree,
      glutenFree,
      vegan,
      veryHealthy,
      veryPopular,
      sustainable,
      cheap,
      calories,
    };
  });
  return formattedData;
}

export { baseAxiosConfig, recipeDataHandler };
