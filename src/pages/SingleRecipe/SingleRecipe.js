import dataTest from "../../dataTest";
import SectionHeading from "../../components/SectionHeading";
import parse from "html-react-parser";
import RecipeImage from "../../components/RecipeImage";
import styles from "./SingleRecipe.module.scss";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaRegHandPointRight } from "react-icons/fa";
import { nanoid } from "nanoid";
import { isEmpty } from "lodash";

const SingleRecipe = () => {
  let {
    title,
    image,
    summary,
    extendedIngredients: ingredients,
    analyzedInstructions: [{ steps }],
  } = dataTest;
  const [showMore, setShowMore] = useState(false);
  let recipeStats = [];

  // add each recipeStat only if true
  for (const [key, value] of Object.entries(dataTest)) {
    if (key === "vegan" && value === true) recipeStats.push("Vegan");
    if (key === "glutenFree" && value === true) recipeStats.push("Gluten Free");
    if (key === "dairyFree" && value === true) recipeStats.push("Dairy Free");
    if (key === "veryHealthy" && value === true)
      recipeStats.push("Very Healthy");
    if (key === "cheap" && value === true) recipeStats.push("Cheap");
    if (key === "sustainable" && value === true)
      recipeStats.push("Sustainable");
  }

  const recipeStatsToDisplay = recipeStats.map((item) => {
    return (
      <li key={nanoid()}>
        <GiCheckMark className={styles.icon} />
        {item}
      </li>
    );
  });

  ingredients = ingredients.map((item) => {
    const {
      nameClean,
      measures: {
        metric: { amount, unitShort },
      },
    } = item;
    return { nameClean, amount, unitShort };
  });

  const ingredientsToDisplay = ingredients.map((item) => {
    if (item.amount) {
      item.amount = Math.round(item.amount);
    } else {
      item.amount = "(amount not available)";
    }

    if (isEmpty(item.unitShort) && item.unitShort !== "")
      item.unitShort = "(unit not available)";

    if (isEmpty(item.nameClean))
      item.nameClean = "(ingredient name not available)";

    return (
      <li key={nanoid()}>
        <div>
          <FaRegHandPointRight className={styles.icon} />
          {item.amount} {item.unitShort} {item.nameClean}
        </div>
      </li>
    );
  });

  const instructionsToDisplay = steps.map((item) => {
    let { number, step } = item;

    if (!number) {
      number = "";
    } else {
      number = number + ".";
    }

    if (!step) step = "Step instructions not available";

    return (
      <li key={nanoid()}>
        <p>
          <span className={styles.stepNumber}>{number}</span> {step}
        </p>
      </li>
    );
  });

  return (
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
      <section className={styles.section}>
        <h3>Recipe Stats</h3>
        <ul className={styles.statsList}>{recipeStatsToDisplay}</ul>
      </section>
      <section className={styles.section}>
        <h3>Ingredients</h3>
        <ul className={styles.ingredientsList}>{ingredientsToDisplay}</ul>
      </section>
      <section>
        <h3>Cooking instructions</h3>
        <ul className={styles.lists}>{instructionsToDisplay}</ul>
      </section>
    </article>
  );
};

export default SingleRecipe;
