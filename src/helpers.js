import axios from "axios";
import isEmpty from "lodash/isEmpty";

// base config for axios call
const baseAxiosConfig = axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
  method: "get",
  params: {
    diet: "vegetarian",
    // fillIngredients: true,
    addRecipeInformation: true,
    // sort: "random",
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
      extendedIngredients: ingredients,
      analyzedInstructions: [{ steps }],
      dairyFree,
      glutenFree,
      vegan,
      veryHealthy,
      veryPopular,
      sustainable,
      cheap,
      nutrition,
    } = item;

    console.log("fullRecipe", item);
    console.log("original ingredients", ingredients);

    // remove repetition of ingredients to display on the backside of recipeCard.
    let ingredientsSet = null;
    let ingredientsWithUnits = [];
    let recipeStats = [];
    let cookingInstructions = [];

    if (vegan) recipeStats.push("Vegan");
    if (glutenFree) recipeStats.push("Gluten Free");
    if (dairyFree) recipeStats.push("Dairy Free");
    if (veryHealthy) recipeStats.push("Very Healthy");
    if (veryPopular) recipeStats.push("Very Popular");
    if (sustainable) recipeStats.push("Sustainable");
    if (cheap) recipeStats.push("Cheap");

    if (isEmpty(title)) {
      title = "Recipe title not available";
    }

    if (isEmpty(summary)) {
      summary = "Recipe description not available";
    }

    if (!isEmpty(ingredients)) {
      // remove any ingredient repetition
      ingredientsSet = [
        ...new Set(ingredients.map((ingredient) => ingredient.nameClean)),
      ];

      // ingredients with units to display on recipe's singlePage
      ingredientsWithUnits = ingredients.map((item) => {
        let {
          nameClean,
          measures: {
            metric: { amount, unitShort },
          },
        } = item;

        if (isEmpty(nameClean)) nameClean = "(ingredient name not available)";
        if (isEmpty(unitShort) && unitShort !== "")
          unitShort = "(unit not available)";

        if (amount) {
          if (unitShort === "g" || unitShort === "ml") {
            amount = Math.round(amount);
          }
        } else {
          amount = "(amount not availabe)";
        }

        return { nameClean, amount, unitShort };
      });
    }

    cookingInstructions = steps.map((item) => {
      let { number, step } = item;

      if (!number) {
        number = "";
      } else {
        number = number + ".";
      }

      if (!step) step = "Step instructions not available";

      return { number, step };
    });

    const calories = Math.round(nutrition.nutrients[0].amount);

    console.log("ingredientsSet", ingredientsSet);
    console.log("ingredientsWithUnits", ingredientsWithUnits);
    console.log("cookingInstructions", cookingInstructions);
    console.log("recipeStats", recipeStats);

    image = undefined;

    return {
      id,
      title,
      image,
      summary,
      ingredientsSet,
      ingredientsWithUnits,
      cookingInstructions,
      calories,
      recipeStats,
      dairyFree,
      glutenFree,
      vegan,
    };
  });
  console.log("formattedData", formattedData);
  return formattedData;
}

export { baseAxiosConfig, recipeDataHandler };
