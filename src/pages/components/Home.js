import { CarouselComponent } from "../../features/ui";
import { SearchForm } from "../../features/forms";
import { RecipesContainer } from "../../features/containers";

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
