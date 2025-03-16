import React, { createContext, useState, useEffect } from "react";
import productsData from "../data/animesdataset.json"; // Adjust path if needed
import Mangadetails from "../data/mangadataset.json";
import AnimeQuotes from "../data/AnimeQuotesdataset.json";
import AnimeCharacter from "../data/character_data.json";
// Create Context
const ShopContext = createContext();

// Provider Component
export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [Manga, setManga] = useState([]);
  const [Quotes, setQuotes] = useState([]);
  const [Character, setCharacter] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);
  useEffect(() => {
    setManga(Mangadetails);
  }, []);
  useEffect(() => {
    setQuotes(AnimeQuotes);
  }, []);
  useEffect(() => {
    setCharacter(AnimeCharacter);
  }, []);

  return (
    <ShopContext.Provider
      value={{
        products,
        setProducts,
        Manga,
        setManga,
        Quotes,
        setQuotes,
        Character,
        setCharacter,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
