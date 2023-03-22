import { TiArrowBack } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "./RecipeCard.module.scss";
import parse from "html-react-parser";
import isEmpty from "lodash/isEmpty";
import { nanoid } from "nanoid";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecipeImage from "./RecipeImage";
import { useDispatch, useSelector } from "react-redux";
import { addFavoriteRecipe } from "../context/features/userSlice";

const RecipeCard = ({ recipe }) => {
  const { user } = useSelector((store) => store.user);
  let { id, title, image, summary, ingredientsSet } = recipe;

  const [showBack, setShowBack] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState("");
  let ingredientsToDisplay = null;
  const flipCardBtn = useRef(null);
  const heartIcon = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (showErrorMsg) {
      setTimeout(() => setShowErrorMsg(""), 2500);
    }
  }, [showErrorMsg]);

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
    // make sure favorite icon or flipacard btn have not been clicked
    if (
      event.target.closest("button") === flipCardBtn.current ||
      event.target.closest("div") === heartIcon.current
    )
      return;

    const formattedTitle = formatStr(title);
    navigate(`/recipe/${recipeId}/${formattedTitle}`);

    // format string to add to url (eg "salty-caramel-cookies")
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

  function handleClick(recipe) {
    if (!user) {
      setShowErrorMsg((prevState) => "Login Required");
      return;
    }
    dispatch(addFavoriteRecipe({ recipe: recipe, userId: user.uid }))
      .unwrap()
      .then(() => setIsFavorite((prevState) => !prevState))
      .catch((error) => {
        console.log("error from unwrap");
        setShowErrorMsg(error);
      });
  }

  // creates a recipe card with two sides. front => title + description. Backside => list of ingredients. img doesn't flip over.
  return (
    <article className={styles.card} onClick={(e) => goToRecipe(e, id)}>
      {showErrorMsg && <p className={styles.errorMsg}>{showErrorMsg}</p>}
      <div className={styles.imgContainer}>
        <RecipeImage image={image} title={title} />
        <div ref={heartIcon} onClick={() => handleClick(recipe)}>
          {isFavorite ? (
            <FaHeart className={styles.filledHeart} />
          ) : (
            <FaRegHeart className={styles.heart} />
          )}
        </div>
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
          onClick={() => setShowBack((prevState) => !prevState)}
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
