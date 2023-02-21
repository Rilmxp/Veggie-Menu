import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import data from "./dataTest";
import Home from "./pages/Home";

// import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
