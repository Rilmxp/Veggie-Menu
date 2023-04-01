import RecipeCard from "../../ui/components/RecipeCard";
import { RecipeFilters } from "../../forms";

import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

import styles from "./FavoriteRecipesContainer.module.scss";

const FavoriteRecipesContainer = () => {
  const { favoriteRecipes, filteredFavoriteRecipes } = useSelector(
    (store) => store.user
  );

  const recipesToDisplay = filteredFavoriteRecipes.map((recipe) => {
    return (
      <li key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </li>
    );
  });

  return (
    <section>
      <h1>Favorite Recipes</h1>
      <div className={styles.recipesSection}>
        {!isEmpty(favoriteRecipes) && <RecipeFilters accountPage={true} />}

        {!isEmpty(filteredFavoriteRecipes) && (
          <ul className={styles.recipesList}>{recipesToDisplay}</ul>
        )}
        {isEmpty(favoriteRecipes) && (
          <p className={styles.errorMsgFilters}>No favourite recipes yet</p>
        )}
        {!isEmpty(favoriteRecipes) && isEmpty(filteredFavoriteRecipes) && (
          <p className={styles.errorMsgFilters}>
            No recipes match the selected filters
          </p>
        )}
      </div>
    </section>
  );
};

export default FavoriteRecipesContainer;
