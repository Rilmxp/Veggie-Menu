import CarouselComponent from "../components/CarouselComponent";
import SearchForm from "../components/SearchForm";
import RecipeFilters from "../components/RecipeFilters";
import RecipesContainer from "../components/RecipesContainer";

const Home = () => {
  return (
    <>
      <CarouselComponent />
      <SearchForm />
      <RecipesContainer />
      {/* <RecipeFilters /> */}
    </>
  );
};

export default Home;
