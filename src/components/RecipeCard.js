import { TiArrowBack } from "react-icons/ti";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import isEmpty from "lodash/isEmpty";
import { nanoid } from "nanoid";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RecipeImage from "./RecipeImage";

const RecipeCard = ({ recipe }) => {
  let { id, title, image, summary, ingredientsSet } = recipe;

  const [showBack, setShowBack] = useState(false);
  let ingredientsToDisplay = null;
  const flipCardBtn = useRef(null);
  const navigate = useNavigate();

  // create list of ingredients to display
  if (ingredientsSet) {
    ingredientsToDisplay = ingredientsSet.map((ingredient) => {
      return <li key={nanoid()}>{ingredient}</li>;
    });
  }

  // converts string to html to keep html tags (<b> etc) as per data received from async call
  const summaryToDisplay = parse(summary);

  // go to dedicated singleRecipe page
  function goToRecipe(event, recipeId) {
    if (event.target.closest("button") === flipCardBtn.current) return;

    const formattedTitle = formatStr(title);
    navigate(`/recipe/${id}/${formattedTitle}`);

    // format string to add to url
    function formatStr(str) {
      let formattedStr = str.toLowerCase().trim();
      const arr = formattedStr.split(" ");
      if (arr.length === 1) {
        formattedStr = arr[0];
      } else {
        formattedStr = arr.join("-");
      }
      return formattedStr;
    }
  }

  function flipCard(event) {
    if (event.target.closest("button") !== flipCardBtn.current) return;
    setShowBack((prevState) => !prevState);
  }

  // creates a recipe card with two sides. front => title + description. Backside => list of ingredients. img doesn't flip over.
  return (
    <article className={styles.card} onClick={(e) => goToRecipe(e, id)}>
      <div className={styles.imgContainer}>
        <RecipeImage image={image} title={title} />
      </div>
      <div className={styles.contentContainer}>
        <div className={showBack ? styles.showBack : styles.contentLayout}>
          {/* front of the card */}
          <section className={styles.front}>
            <h6 className={styles.recipeHeading}>{title}</h6>
            <p className={styles.recipeDescription}>{summaryToDisplay}</p>
          </section>

          {/* back of the card */}
          <section className={styles.back}>
            <h6 className={styles.ingredientsHeading}>Ingredients</h6>
            <div className={styles.ingredientsContainer}>
              {isEmpty(ingredientsSet) ? (
                <p>Ingredients list not available</p>
              ) : (
                <ul className={styles.listStyle}>{ingredientsToDisplay}</ul>
              )}
            </div>
          </section>
        </div>
        <button
          onClick={flipCard}
          ref={flipCardBtn}
          className={styles.recipeBtn}
        >
          <TiArrowBack />
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;
