import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import CarouselComponent from "./components/CarouselComponent";
import SectionHeading from "./components/SectionHeading";
import FormComponent from "./components/FormComponent";
import RecipeCard from "./components/RecipeCard";
import Footer from "./components/Footer";
import data from "./dataTest";

// import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

function App() {
  const [dataRecipes, setDataRecipes] = useState(data);
  console.log("dataRecipes", dataRecipes);

  const recipes = dataRecipes.map((recipe) => {
    // set default img if none provided
    if (isEmpty(recipe.image)) {
      const image = "default image";
      // recipe.image = "default picture";
    }

    if (isEmpty(recipe.summary)) {
      const summary = "Recipe description not available";
      // recipe.summary = "Recipe description not available";
    }

    return { ...recipe, image: image, summary: summary };
  });

  console.log("recipes", recipes);

  // setData(prevState);

  /*
    if (isEmpty(recipe.extendedIngredients) === true) {
      console.log("true");
      recipe.extendedIngredients = "Ingredients list not available";
      console.log(recipe.extendedIngredients);
    } else {
      console.log("false");
      // const ingredients = recipe.extendedIngredients.map(
      //   (ingredient) => ingredient.name
      // );
      // recipe.extendedIngredients = ingredients;
    }
    return <RecipeCard key={recipe.id} recipe={recipe} />;
  });
*/

  return (
    <div className="App">
      <NavigationBar />
      <CarouselComponent />
      <SectionHeading title="Search for Recipes" />
      <FormComponent />
      <SectionHeading title="Recipes" />
      {/* {recipes} */}

      <Footer />
    </div>
  );
}

export default App;
