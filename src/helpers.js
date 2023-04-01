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
    addRecipeNutrition: true,
    sort: "random",
    number: "5",
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

    // remove repetition of ingredients to display on the backside of recipeCard.
    let ingredientsSet = null;
    let ingredientsWithUnits = [];
    let recipeStats = [];
    let cookingInstructions = [];

    // Add any available stats to be displayed
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
          amount = "(amount not available)";
        }

        return { nameClean, amount, unitShort };
      });
    }

    if (!isEmpty(steps)) {
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
    }

    const calories = Math.round(nutrition.nutrients[0].amount);

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
  return formattedData;
}

// format string to add to url (eg " Salty Caramel Cookies" => "salty-caramel-cookies")
function formatStr(str) {
  let formattedStr = str.toLowerCase().trim();
  const arr = formattedStr.split(" ");
  if (arr.length === 1) {
    formattedStr = arr[0];
  } else {
    formattedStr = arr.join("-");
  }
  return formattedStr;
}

// format username string (eg "rICHard LuCAS  " => "Richard Lucas")
function formatUsername(name) {
  let formattedUsername = name.toLowerCase().trim();
  let words = formattedUsername.split(" ");
  words.forEach((item, index) => {
    if (words[index]) {
      words[index] = item[0].toUpperCase() + item.substring(1);
    }
  });
  formattedUsername = words.join(" ");
  return formattedUsername;
}

export { baseAxiosConfig, recipeDataHandler, formatStr, formatUsername };
