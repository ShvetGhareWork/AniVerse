import React, { useContext } from "react";
// import ProductDetails from "./components/ProductDetails";
import ShopContext from "./context/ShopContext.jsx";
import Slider from "./components/Slider.jsx";
import Navbar from "./components/Navbar.jsx";
import "./App.css";
import CardSliderPopular from "./components/CardSliderPopular.jsx";
import CardSliderTrending from "./components/CardSliderTrending.jsx";
import CardSliderRanked from "./components/CardSliderRanked.jsx";
import CircularGallery from "./ReactBits/Gallery.jsx";
import Genre from "./ReactBits/Genre.jsx";

const App = () => {
  const { products } = useContext(ShopContext);

  const velocity = 100;
  // The details required are comming properly
  const genres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Kids",
    "Magic",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Romance",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shounen",
    "Slice of Life",
    "Sports",
    "Super Power",
    "Supernatural",
    "Dementia",
  ];

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
      <div className="mb-14" style={{ height: "600px", position: "relative" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} />
      </div>

      {/* <Genre
        items={genres}
        onItemSelect={(item, index) => console.log(item, index)}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
      /> */}
    </>
  );
};

export default App;
