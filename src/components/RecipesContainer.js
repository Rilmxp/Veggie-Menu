import SectionHeading from "./SectionHeading";
import RecipeFilters from "./RecipeFilters";
import RecipeCard from "./RecipeCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Loader } from "./Loader";
import styles from "./RecipesContainer.module.scss";

import isEmpty from "lodash/isEmpty";
import { loadPreviousRecipes } from "../features/recipesSlice";

const RecipesContainer = () => {
  let { loading, recipes, filteredRecipes, errorMessage } = useSelector(
    (store) => store.recipes
  );
  const dispatch = useDispatch();

  const recipesToDisplay = filteredRecipes.map((recipe) => {
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
      }, 3000);
    }
  }, [recipes]);

  return (
    <section>
      <SectionHeading title="Recipes" />
      {loading ? (
        <Loader />
      ) : errorMessage ? (
        <p className={styles.errorMsg}>{errorMessage}</p>
      ) : (
        <div className={styles.recipesSection}>
          <RecipeFilters />
          <ul className={styles.recipesList}>{recipesToDisplay}</ul>
          {isEmpty(filteredRecipes) && (
            <p className={styles.errorMsgFilters}>
              No recipes match the selected filters
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default RecipesContainer;
