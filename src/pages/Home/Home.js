import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadPreviousRecipes } from "../../context/features/recipesSlice";
import isEmpty from "lodash/isEmpty";

import CarouselComponent from "./components/CarouselComponent";
import SearchForm from "./components/SearchForm";
import Loader from "../../components/Loader";
import RecipeFilters from "../../components/RecipeFilters";
import RecipeCard from "../../components/RecipeCard";

import styles from "./Home.module.scss";

const Home = () => {
  let { loading, recipes, filteredRecipes, errorMessage } = useSelector(
    (store) => store.recipes
  );
  const dispatch = useDispatch();

  const recipesToDisplay = filteredRecipes.map((recipe) => {
    return (
      <li key={recipe.id}>
        <RecipeCard recipe={recipe} />
      </li>
    );
  });

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        dispatch(loadPreviousRecipes());
      }, 3000);
    }
  }, [recipes]);

  // if (loading) {
  //   return (
  //     <>
  //       <CarouselComponent />
  //       <SearchForm />
  //       <section>
  //         <h1>Recipes</h1>
  //         {loading && <Loader />}
  //       </section>
  //     </>
  //   );
  // }

  return (
    <main>
      <CarouselComponent />
      <SearchForm />
      <section>
        <h1>Recipes</h1>
        {loading && <Loader />}
        {errorMessage && <p className={styles.errorMsg}>{errorMessage}</p>}
        {!loading && (
          <div className={styles.recipesSection}>
            {!isEmpty(recipes) && <RecipeFilters />}

            {!isEmpty(filteredRecipes) && (
              <ul className={styles.recipesList}>{recipesToDisplay}</ul>
            )}

            {!errorMessage && isEmpty(filteredRecipes) && (
              <p className={styles.errorMsgFilters}>
                No recipes match the selected filters
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
