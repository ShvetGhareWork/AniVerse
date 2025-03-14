import React, { useContext } from "react";
import ShopContext from "../context/ShopContext";

const GenreGrid = () => {
  const { products } = useContext(ShopContext);
  console.log(products);

  // Randomize the products array and pick 16 items (or fewer if there aren't enough)
  const shuffledProducts = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 16);

  return (
    <div className="flex gap-[2%] flex-wrap">
      {shuffledProducts.map((product, index) => (
        <div key={product.id || index} className="w-[23.5%] h-2/4">
          {product.name || `Product ${index + 1}`}
        </div>
      ))}
    </div>
  );
};

export default GenreGrid;
