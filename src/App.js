import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "./features/recipesSlice";

function App() {
  const dispatch = useDispatch();

  // fetch homepage recipes only once when app loads
  useEffect(() => {
    dispatch(fetchRecipes("complexSearc?"));
  }, []);

  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
