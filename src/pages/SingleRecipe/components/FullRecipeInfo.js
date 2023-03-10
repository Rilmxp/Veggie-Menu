import dataTest from "../../../dataTest";
import SectionHeading from "../../../components/SectionHeading";
import parse from "html-react-parser";
import RecipeImage from "../../../components/RecipeImage";
import styles from "./FullRecipeInfo.module.scss";
import { useSelector } from "react-redux";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaRegHandPointRight } from "react-icons/fa";
import { nanoid } from "nanoid";
import { isEmpty } from "lodash";
import { useParams } from "react-router-dom";

const FullRecipeInfo = () => {
  const { recipes } = useSelector((store) => store.recipes);
  console.log("recipes", recipes);
  const { id } = useParams();
  console.log("idParams", id);

  const selectedRecipe = recipes.find((item) => item.id === +id);
  console.log("selectedRecipe", selectedRecipe);

  const {
    title,
    image,
    summary,
    ingredientsWithUnits,
    cookingInstructions,
    recipeStats,
  } = selectedRecipe;

  console.log("recipeStats", recipeStats);

  const [showMore, setShowMore] = useState(false);

  const recipeStatsToDisplay = recipeStats.map((item) => {
    return (
      <li key={nanoid()}>
        <GiCheckMark className={styles.icon} />
        {item}
      </li>
    );
  });

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
    <main>
      <article className={styles.articleLayout}>
        <SectionHeading title={title} />
        <div className={styles.imgLayout}>
          <RecipeImage image={image} title={title} />
        </div>
        <section className={styles.section}>
          <h3>Description</h3>
          {showMore ? parse(summary) : parse(summary.substring(0, 400) + "...")}
          <button
            className={styles.showMoreBtn}
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show less" : "Show more"}
          </button>
        </section>
        {!isEmpty(recipeStats) && (
          <section className={styles.section}>
            <h3>Recipe Stats</h3>
            <ul className={styles.statsList}>{recipeStatsToDisplay}</ul>
          </section>
        )}

        <section className={styles.section}>
          <h3>Ingredients</h3>
          <ul className={styles.ingredientsList}>{ingredientsToDisplay}</ul>
        </section>
        <section>
          <h3>Cooking instructions</h3>
          <ul className={styles.lists}>{instructionsToDisplay}</ul>
        </section>
      </article>
    </main>
  );
};

export default FullRecipeInfo;
