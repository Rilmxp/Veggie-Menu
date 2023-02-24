import SectionHeading from "./SectionHeading";
// import data from "../dataTest";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";
import styles from "./RecipesContainer.module.scss";

import isEmpty from "lodash/isEmpty";

const RecipesContainer = () => {
  const { loading, recipes, errorMessage } = useSelector(
    (store) => store.recipes
  );

  return (
    <>
      <SectionHeading title="Recipes" />
      {loading && <Loader />}
      {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}

      {recipes &&
        recipes.map((recipe) => {
          return <RecipeCard key={recipe.id} recipe={recipe} />;
        })}
    </>
  );
};

export default RecipesContainer;
