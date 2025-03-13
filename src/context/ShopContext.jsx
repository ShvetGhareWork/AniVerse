import React, { createContext, useState, useEffect } from "react";
import productsData from "../data/animesdataset.json"; // Adjust path if needed

// Create Context
const ShopContext = createContext();

// Provider Component
export const ShopProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <ShopContext.Provider value={{ products, setProducts }}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContext;
