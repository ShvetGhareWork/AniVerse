import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Anime from "./pages/Anime.jsx";
import Manga from "./pages/Manga.jsx";
import Characters from "./pages/Characters.jsx";
import Quotes from "./pages/Quotes.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/manga" element={<Manga />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/quotes" element={<Quotes />} />
      </Routes>
    </>
  );
};

export default App;
