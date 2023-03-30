import { TiArrowBack } from "react-icons/ti";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import RecipeImage from "./RecipeImage";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteRecipe,
  removeFavoriteRecipe,
} from "../../../context/features/userSlice";
import { formatStr } from "../../../helpers";

import parse from "html-react-parser";
import { nanoid } from "nanoid";
import isEmpty from "lodash/isEmpty";
import styles from "./RecipeCard.module.scss";

const RecipeCard = ({ recipe }) => {
  const { user, favoriteRecipes } = useSelector((store) => store.user);
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

  useEffect(() => {
    const found = favoriteRecipes.find((item) => item.id === recipe.id);
    if (found) {
      setIsFavorite(true);
    }
  }, []);

  // create list of ingredients to display
  if (ingredientsSet) {
    ingredientsToDisplay = ingredientsSet.map((ingredient) => {
      return <li key={nanoid()}>{ingredient}</li>;
    });
  }

  // converts string to html to keep html tags (<b> etc) as per data received from async call
  const summaryToDisplay = summary && parse(summary);

  // go to dedicated singleRecipe page
  function goToRecipe(event, recipeId) {
    // check favorite icon or flipacard btn have not been clicked
    if (
      event.target.closest("button") === flipCardBtn.current ||
      event.target.closest("div") === heartIcon.current
    )
      return;

    // format string to add to url (eg " Salty Caramel Cookies" => "salty-caramel-cookies")
    const formattedTitle = formatStr(title);
    navigate(`/recipe/${recipeId}/${formattedTitle}`);
  }

  function handleClick(recipe) {
    if (!user) {
      setShowErrorMsg("Login Required");
      return;
    }

    if (!isFavorite) {
      dispatch(
        addFavoriteRecipe({
          recipe: recipe,
          userId: user.uid,
          email: user.email,
        })
      )
        .unwrap()
        .then(() => setIsFavorite((prevState) => !prevState))
        .catch((error) => {
          setShowErrorMsg(error);
        });
    } else {
      dispatch(
        removeFavoriteRecipe({
          recipe: recipe,
          userId: user.uid,
        })
      )
        .unwrap()
        .then(() => setIsFavorite((prevState) => !prevState))
        .catch((error) => {
          setShowErrorMsg(error);
        });
    }
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
            <p className={styles.recipeDescription}>
              {summaryToDisplay || "Recipe Description not available"}
            </p>
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
