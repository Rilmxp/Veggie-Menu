import DefaultRecipeImg from "./DefaultRecipeImg";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import isEmpty from "lodash/isEmpty";
import { nanoid } from "nanoid";

const RecipeCard = ({ recipe }) => {
  let { title, image, summary, ingredients } = recipe;

  // create list of ingredients to display
  if (ingredients) {
    ingredients = ingredients.map((ingredient, index) => {
      return <li key={nanoid()}>{ingredient}</li>;
    });
  }

  // converts string to html to keep <b> <a> etc as per data received from async call
  const summaryToDisplay = parse(summary);

  // creates a recipe card with two sides. front => title + description. Backside => list of ingredients. img doesn't flip over.
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        {isEmpty(image) ? (
          <DefaultRecipeImg />
        ) : (
          <img className={styles.recipeImage} src={image} alt={title} />
        )}
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentLayout}>
          {/* front of the card */}
          <div className={styles.cardFront}>
            <h6 className={styles.recipeHeading}>{title}</h6>
            <p className={styles.recipeDescription}>{summaryToDisplay}</p>
          </div>

          {/* back of the card */}
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
