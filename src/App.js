import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "./context/features/recipesSlice";
import { ProtectedRoute, ScrollToTop } from "./features/config";
import { NavigationBar, Footer } from "./features/layout";
import { Home, SingleRecipe, Login, SignUp, Account, Error } from "./pages";

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
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id/:title" element={<SingleRecipe />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/*" element={<Error />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
