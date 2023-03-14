import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe";
import LogInForm from "./pages/Authentication/LogInForm";
import SignUpForm from "./pages/Authentication/SignUpForm";
import Error from "./pages/Error/Error";
import ScrollToTop from "./components/ScrollToTop";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRecipes } from "./context/features/recipesSlice";
import { login, logout } from "./context/features/userSlice";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

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
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/recipe/:id/:title" element={<SingleRecipe />} />
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/" element={<SignUpForm />} />
            <Route path="/log-in" element={<LogInForm />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </ScrollToTop>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
