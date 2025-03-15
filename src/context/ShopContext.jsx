import React, { createContext, useState, useEffect } from "react";
import productsData from "../data/animesdataset.json"; // Adjust path if needed
import Mangadetails from "../data/mangadataset.json";
// Create Context
const ShopContext = createContext();

// Provider Component
export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [Manga, setManga] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);
  useEffect(() => {
    setManga(Mangadetails);
  }, []);

  return (
    <ShopContext.Provider value={{ products, setProducts, Manga, setManga }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
