import axios from "axios";
import isEmpty from "lodash/isEmpty";
import { useState, useLayoutEffect } from "react";

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
    number: "2",
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

// create listener to decrease layout distorsions on mobile when virtual keyboard is open.

function screenResizeListener(initialWidth, initialHeight) {
  window.addEventListener("resize", function () {
    let metaViewport = document.querySelector("meta[name=viewport]");
    let currentHeight = window.innerHeight;
    let currentWidth = window.innerWidth;

    // no change of orientation
    if (initialWidth === currentWidth) {
      // check if virtual keyboard is open (takes up part of the viewport's height)
      if (currentHeight < initialHeight) {
        // add height in pixels to viewport
        metaViewport.setAttribute(
          "content",
          "height=" +
            initialHeight +
            "px, width=device-width, initial-scale=1.0"
        );
      } else {
        //reset viewport if keyboard is closed.
        metaViewport.setAttribute(
          "content",
          "width=device-width, initial-scale=1.0"
        );
      }
    }

    // if orientation has changed.
    if (initialWidth !== currentWidth) {
      // forcefully close keyboard to ease calculations.
      if (document.hasFocus()) document.querySelector("input").blur();

      // reset viewport
      metaViewport.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0"
      );
      // set new initial width and height. Delay is given to allow system to adjust automatic viewport values
      setTimeout(() => {
        initialWidth = currentWidth;
        initialHeight = currentHeight;
      }, 1000);
    }
  });
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState([0, 0]);
  const updateWindowSize = () => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    updateWindowSize();
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);
  return [windowSize[0], windowSize[1]];
};

export {
  baseAxiosConfig,
  recipeDataHandler,
  formatStr,
  formatUsername,
  useWindowSize,
  screenResizeListener,
};
