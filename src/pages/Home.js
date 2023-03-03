import CarouselComponent from "../components/CarouselComponent";
import SearchForm from "../components/SearchForm";
import RecipesContainer from "../components/RecipesContainer";

const Home = () => {
  return (
    <>
      <CarouselComponent />
      <SearchForm />
      <RecipesContainer />
    </>
  );
};

export default Home;
