import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPreviousRecipes } from "../../../context/features/recipesSlice";

import { Loader } from "../../ui";
import { RecipeFilters } from "../../forms";
import RecipeCard from "../../ui/components/RecipeCard";

import isEmpty from "lodash/isEmpty";
import styles from "./RecipesContainer.module.scss";

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
      <h1>Recipes</h1>
      {loading && <Loader />}
      {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
      {!loading && (
        <div className={styles.recipesSection}>
          {!isEmpty(recipes) && <RecipeFilters />}

          {!isEmpty(filteredRecipes) && (
            <ul className={styles.recipesList}>{recipesToDisplay}</ul>
          )}

          {!errorMessage && isEmpty(filteredRecipes) && (
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
