import DefaultRecipeImg from "./DefaultRecipeImg";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import isEmpty from "lodash/isEmpty";
import { useRef } from "react";

const RecipeCard = ({ recipe }) => {
  let { title, image, summary, ingredients } = recipe;

  ingredients = ingredients.map((ingredient, index) => {
    return <li key={+index}>{ingredient}</li>;
  });

  summary = parse(summary);

  return (
    <div className={styles.card}>
      <div className="imgContainer">
        {isEmpty(image) ? (
          <DefaultRecipeImg />
        ) : (
          <img className="recipeImg" src={image} alt={title} />
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentLayout}>
          <div className={styles.cardFront}>
            <h6 className={styles.recipeHeading}>{title}</h6>

            <p className={styles.recipeDescription}>{summary}</p>
          </div>
          <div className={styles.cardBack}>
            <h6 className={styles.ingredientsHeading}>Ingredients</h6>
            <div className={styles.ingredientsContainer}>
              {isEmpty(ingredients) ? (
                <p>Ingredients list not available</p>
              ) : (
                <ul className={styles.listStyle}>{ingredients}</ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
