import DefaultRecipeImg from "./DefaultRecipeImg";
import defaultImage from "../assets/images/default.jpg";
import styles from "./RecipeImage.module.scss";
import isEmpty from "lodash/isEmpty";

const RecipeImage = ({ image, title }) => {
  // render default img
  if (isEmpty(image)) {
    return (
      <>
        <img src={defaultImage} alt="Fruits and vegetables" />
        <div className={styles.imgNotAvailbleMsg}>
          <p>Recipe image not available</p>
        </div>
      </>
    );
  }

  // render actual image.
  return (
    <>
      <img className={styles.recipeImg} src={image} alt={title} />
    </>
  );
};

export default RecipeImage;
