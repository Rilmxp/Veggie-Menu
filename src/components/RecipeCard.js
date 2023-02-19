import defaultImage from "../assets/images/default.jpg";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import { _get } from "lodash";

import axios from "axios";

const recipeRequests = axios.create({
  baseURL: "https://api.spoonacular.com/recipes/",
  method: "get",
  params: {
    apiKey: process.env.REACT_APP_SPOONACULAR_API_KEY,
  },
});

// recipeRequests(
//   "/complexSearch?diet=vegan&addRecipeInformation=true&fillIngredients=true"
// )
//   .then((res) => console.log(res.data.results))
//   .catch((error) => console.log(error));

const RecipeCard = ({ recipe }) => {
  const { title, image, summary } = recipe;

  const parsedSummary = parse(summary);

  return (
    <div className={styles.card}>
      <div className={styles.imgContainer}>
        <img className={styles.recipeImg} src={image} alt="recipe picture" />
        <div className={styles.imgNotAvailbleMsg}>
          <p>Recipe image not available</p>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.contentLayout}>
          <div className={styles.cardFront}>
            <h6 className={styles.recipeHeading}>{title}</h6>

            <p className={styles.recipeDescription}>{parsedSummary}</p>
          </div>
          <div className={styles.cardBack}>
            <h6 className={styles.ingredientsHeading}>Ingredients</h6>

            <ul className={styles.listStyle}>
              <li>Apples</li>
              <li>lemon</li>
              <li>candy</li>
              <li>sugar</li>
              <li>spinach</li>
              <li>Olives</li>
              <li>salt</li>
              <li>tofu</li>
              <li>spinach</li>
              <li>spinach</li>
              <li>spinach</li>
              <li>spinach</li>
              <li>spinach</li>
              <li>spinach</li>
              <li>spinach</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
