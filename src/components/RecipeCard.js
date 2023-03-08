import { TiArrowBack } from "react-icons/ti";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import isEmpty from "lodash/isEmpty";
import { nanoid } from "nanoid";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RecipeImage from "./RecipeImage";

const RecipeCard = ({ recipe }) => {
  let { title, image, summary, ingredients } = recipe;

  const [showBack, setShowBack] = useState(false);
  const flipCardBtn = useRef(null);
  const navigate = useNavigate();

  // create list of ingredients to display
  if (ingredients) {
    ingredients = ingredients.map((ingredient, index) => {
      return <li key={nanoid()}>{ingredient}</li>;
    });
  }

  // converts string to html to keep html tags (<b> etc) as per data received from async call
  const summaryToDisplay = parse(summary);

  function handleClick(event) {
    // setShowBack((prevState) => !prevState);
    if (event.target.closest("button") === flipCardBtn.current) {
      setShowBack((prevState) => !prevState);
    } else {
      const formattedTitle = formatStr(title);
      navigate(`/recipe/${formattedTitle}`);
    }

    function formatStr(str) {
      let formattedStr = str.toLowerCase().trim();
      const arr = formattedStr.split(" ");
      console.log("array splitted", arr);
      if (arr.length === 1) {
        formattedStr = arr[0];
      } else {
        formattedStr = arr.join("-");
      }
      return formattedStr;
    }
  }

  // creates a recipe card with two sides. front => title + description. Backside => list of ingredients. img doesn't flip over.
  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imgContainer}>
        <RecipeImage image={image} title={title} />
      </div>
      <div className={styles.contentContainer}>
        <div className={showBack ? styles.showBack : styles.contentLayout}>
          {/* front of the card */}
          <div className={styles.front}>
            <h6 className={styles.recipeHeading}>{title}</h6>
            <p className={styles.recipeDescription}>{summaryToDisplay}</p>
          </div>

          {/* back of the card */}
          <div className={styles.back}>
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
        <button ref={flipCardBtn} className={styles.recipeBtn}>
          <TiArrowBack />
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
