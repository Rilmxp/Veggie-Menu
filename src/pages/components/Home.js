import { CarouselComponent } from "../../features/ui";
import { SearchForm } from "../../features/forms";
import { RecipesContainer } from "../../features/containers";
import { useEffect, useState } from "react";
import { screenResizeListener } from "../../helpers";

const Home = () => {
  const [initialHeight, setInitialHeight] = useState(window.innerHeight);
  const [initialWidth, setInitialWidth] = useState(window.innerWidth);

  useEffect(() => {
    screenResizeListener(initialHeight, initialWidth);
  }, [initialHeight, initialWidth]);

  return (
    <main>
      <CarouselComponent />
      <SearchForm />
      <RecipesContainer />
    </main>
  );
};

export default Home;
