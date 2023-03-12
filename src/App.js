import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe";
import Login from "./pages/Login";
import Error from "./pages/Error/Error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "./context/features/recipesSlice";

function App() {
  const dispatch = useDispatch();

  // fetch homepage recipes only once when app loads
  useEffect(() => {
    dispatch(fetchRecipes("complexSearc?"));
  }, []);

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<SingleRecipe />} /> */}

          <Route path="/recipe/:title" element={<SingleRecipe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
