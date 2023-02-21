import SectionHeading from "./SectionHeading";
// import data from "../dataTest";
import RecipeCard from "./RecipeCard";
import { useState, useEffect } from "react";
import axios from "axios";

const httpRequestsConfig = axios.create({
  baseURL: "https://api.spoonacular.com/recipes/",
  method: "get",
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

// recipeRequests(
//   "/complexSearch?diet=vegan&addRecipeInformation=true&fillIngredients=true"
// )
//   .then((res) => data = res.data.results
//   .catch((error) => console.log(error));

const RecipesContainer = () => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  function fetchRecipes() {
    httpRequestsConfig(
      "/complexSearch?diet=vegan&addRecipeInformation=true&fillIngredients=true&number=3"
    )
      .then((res) => {
        setRecipes(res.data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    // fetchRecipes();
  }, []);

  console.log(recipes);

  // WORKS.
  // const recipes = data.map((recipe) => {
  //   return <RecipeCard key={recipe.id} recipe={recipe} />;
  // });
  return (
    <>
      <SectionHeading title="Recipes" />
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
      ;{/* {recipes} */}
    </>
  );
};

export default RecipesContainer;
