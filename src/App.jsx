import React, { useContext } from "react";
// import ProductDetails from "./components/ProductDetails";
import ShopContext from "./context/ShopContext.jsx";
import Slider from "./components/Slider.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";
import CardSliderPopular from "./components/CardSliderPopular.jsx";
import CardSliderTrending from "./components/CardSliderTrending.jsx";
import CardSliderRanked from "./components/CardSliderRanked.jsx";

const App = () => {
  const { products } = useContext(ShopContext);

  const velocity = 100;
  // The details required are comming properly

  return (
    <>
      {/* //{" "}
      <div>
        // <div>{products.map(ProductDetails)}</div>
        //{" "}
      </div> */}
      <Navbar />
      <Slider />

      <CardSliderTrending />
      <CardSliderPopular />
      <CardSliderRanked />
    </>
  );
};

export default App;
