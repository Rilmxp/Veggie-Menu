import SectionHeading from "./SectionHeading";
// import data from "../dataTest";
import RecipeFilters from "./RecipeFilters";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { Loader } from "./Loader";
import styles from "./RecipesContainer.module.scss";

import isEmpty from "lodash/isEmpty";
import { loadPreviousRecipes } from "../features/recipesSlice";

const RecipesContainer = () => {
  let { loading, recipes, errorMessage } = useSelector(
    (store) => store.recipes
  );

  console.log("recipes", recipes);

  const dispatch = useDispatch();

  recipes = recipes.map((recipe) => {
    return (
      <li key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </li>
    );
  });

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(loadPreviousRecipes());
      }, 4000);
    }
  }, [recipes]);

  return (
    <>
      <SectionHeading title="Recipes" />
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <p className={styles.errorMsg}>{errorMessage}</p>
      ) : (
        <div className={styles.recipesSection}>
          <RecipeFilters />
          <ul className={styles.recipesList}>{recipes}</ul>
        </div>
      )}
    </>
  );
};

export default RecipesContainer;
