import SectionHeading from "./SectionHeading";
// import data from "../dataTest";
import RecipeCard from "./RecipeCard";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

import isEmpty from "lodash/isEmpty";

const RecipesContainer = () => {
  const { loading, recipes } = useSelector((store) => store.recipes);

  return (
    <>
      <SectionHeading title="Recipes" />
      {loading && <Loader />}
      {/* {isEmpty(recipes) && <p>No recipes available</p>} */}
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </>
  );
};

export default RecipesContainer;
