import defaultImage from "../assets/images/default.jpg";
import DefaultRecipeImg from "./DefaultRecipeImg";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import isEmpty from "lodash/isEmpty";

import axios from "axios";

// recipeRequests(
//   "/complexSearch?diet=vegan&addRecipeInformation=true&fillIngredients=true"
// )
//   .then((res) => console.log(res.data.results))
//   .catch((error) => console.log(error));

const RecipeCard = ({ recipe }) => {
  let { title, image, summary, extendedIngredients } = recipe;
  let ingredients;

  if (isEmpty(summary)) {
    summary = "Recipe description not available";
  } else {
    summary = parse(summary);
  }

  if (!isEmpty(extendedIngredients)) {
    // remove any ingredient repeatition
    let uniqueIngredients = [
      ...new Set(extendedIngredients.map((ingredient) => ingredient.nameClean)),
    ];

    // create list of ingredients
    ingredients = uniqueIngredients.map((ingredient, index) => {
      return <li key={index}>{ingredient}</li>;
    });
  }

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
              {isEmpty(extendedIngredients) ? (
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
