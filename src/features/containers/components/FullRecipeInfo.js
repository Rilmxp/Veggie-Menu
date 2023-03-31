import { RecipeImage } from "../../../features/ui";
import { GiCheckMark } from "react-icons/gi";
import { FaRegHandPointRight } from "react-icons/fa";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { nanoid } from "nanoid";
import { isEmpty } from "lodash";
import parse from "html-react-parser";
import styles from "./FullRecipeInfo.module.scss";

const FullRecipeInfo = () => {
  const { recipes } = useSelector((store) => store.recipes);
  const { favoriteRecipes } = useSelector((store) => store.user);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // find the user's selected recipe to show
  const selectedRecipe =
    recipes.find((item) => item.id === +id) ||
    favoriteRecipes.find((item) => item.id === +id);

  // if recipe page gets refreshed, send to "/" instead of crashing the website.
  useEffect(() => {
    if (!selectedRecipe) {
      navigate("/");
      return;
    }
  }, [selectedRecipe]);

  if (!selectedRecipe) return;

  let {
    title,
    image,
    summary,
    ingredientsWithUnits,
    cookingInstructions,
    recipeStats,
  } = selectedRecipe;

  // eg "vegan", "cheap", "sustainable" etc...
  const recipeStatsToDisplay = recipeStats.map((item) => {
    return (
      <li key={nanoid()}>
        <GiCheckMark className={styles.icon} />
        {item}
      </li>
    );
  });

  // eg {100} {grms} {Flour}
  const ingredientsToDisplay = ingredientsWithUnits.map((item) => {
    return (
      <li key={nanoid()}>
        <div>
          <FaRegHandPointRight className={styles.icon} />
          {item.amount} {item.unitShort} {item.nameClean}
        </div>
      </li>
    );
  });

  // eg {1} {Pour oil in the pan}
  const instructionsToDisplay = cookingInstructions.map((item) => {
    return (
      <li key={nanoid()}>
        <p>
          <span className={styles.stepNumber}>{item.number}</span> {item.step}
        </p>
      </li>
    );
  });

  return (
    <article className={styles.articleLayout}>
      <h1>{title}</h1>
      <div className={styles.imgLayout}>
        <RecipeImage image={image} title={title} />
      </div>
      <section className={styles.section}>
        <h3>Description</h3>
        {isEmpty(summary) ? (
          <p className={styles.itemsNotAvailable}>
            Recipe description not available.
          </p>
        ) : (
          <>
            {showMore
              ? parse(summary)
              : parse(summary.substring(0, 400) + " ... ")}
            <button
              className={styles.showMoreBtn}
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}
            </button>
          </>
        )}
      </section>
      {!isEmpty(recipeStats) && (
        <section className={styles.section}>
          <h3>Recipe Stats</h3>
          <ul className={styles.statsList}>{recipeStatsToDisplay}</ul>
        </section>
      )}
      <section className={styles.section}>
        <h3>Ingredients</h3>
        {isEmpty(ingredientsToDisplay) ? (
          <p className={styles.itemsNotAvailable}>Ingredients not available.</p>
        ) : (
          <ul className={styles.ingredientsList}>{ingredientsToDisplay}</ul>
        )}
      </section>
      <section>
        <h3>Cooking instructions</h3>
        {isEmpty(instructionsToDisplay) ? (
          <p className={styles.itemsNotAvailable}>
            Cooking instructions not available.
          </p>
        ) : (
          <ul className={styles.lists}>{instructionsToDisplay}</ul>
        )}
      </section>
    </article>
  );
};

export default FullRecipeInfo;
