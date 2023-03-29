import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe";
// import LoginForm from "./pages/Authentication/LoginForm";
import SignUpForm from "./pages/Authentication/SignUpForm";
import Error from "./pages/Error/Error";
import Account from "./pages/Authentication/Account";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "./context/features/recipesSlice";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpForm2 from "./components/forms/index";
import { LoginForm } from "./components/forms/index";

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
            <Route path="/" element={<LoginForm />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/recipe/:id/:title" element={<SingleRecipe />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
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
