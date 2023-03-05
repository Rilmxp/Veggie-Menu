import CarouselComponent from "../components/CarouselComponent";
import SearchForm from "../components/SearchForm";
import RecipesContainer from "../components/RecipesContainer";

const Home = () => {
  return (
    <main>
      <CarouselComponent />
      <SearchForm />
      <RecipesContainer />
    </main>
  );
};

export default Home;
