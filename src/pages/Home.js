import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CarouselComponent from "../components/CarouselComponent";
import SearchForm from "../components/SearchForm";
import RecipeFilters from "../components/RecipeFilters";
import RecipesContainer from "../components/RecipesContainer";
import { fetchRecipes } from "../features/recipesSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes());
  }, []);

  return (
    <>
      <CarouselComponent />
      <SearchForm />
      <RecipeFilters />
      <RecipesContainer />
    </>
  );
};

export default Home;
