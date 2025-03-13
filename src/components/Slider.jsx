"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopContext from "../context/ShopContext";

// Product Details Component
const ProductDetails = ({ product }) => {
  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="absolute bottom-6 left-4 md:bottom-12 md:left-8 flex flex-col gap-3 text-white"
    >
      {/* Product Name */}
      <h3 className="text-[#f2de9b] font-bold text-lg md:text-2xl">
        {product.title}
      </h3>

      {/* Genre */}
      <p className="text-gray-300 text-sm md:text-lg">
        <b>Genre:</b> {product.genre.join(", ")}
      </p>

      {/* More Info Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#9ca081] text-black px-4 py-2 md:px-6 md:py-2 rounded-lg hover:bg-[#b1b88f] transition-all text-sm md:text-lg w-max"
      >
        More Info
      </motion.a>
    </motion.div>
  );
};

export default function Slider() {
  const { products } = useContext(ShopContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Only show the first 10 products
  const firstTenProducts = products.slice(0, 10);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % firstTenProducts.length);
  }, [firstTenProducts.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + firstTenProducts.length) % firstTenProducts.length
    );
  }, [firstTenProducts.length]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  if (firstTenProducts.length === 0) return <div>Loading...</div>;

  return (
    <div
      className="relative w-full h-full max-h-xxxl max-w-7xl mx-auto mb-28 mt-12 overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={() => setIsAutoPlaying(false)} // Stop autoplay on hover
      onMouseLeave={() => setIsAutoPlaying(true)} // Resume autoplay when the cursor leaves
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {firstTenProducts.map((product, index) => (
          <div
            key={index}
            className="w-full h-[350px] md:h-[450px] flex-shrink-0 relative"
          >
            {/* Product Image with Circular Gradient */}
            <div className="relative w-full h-full">
              <img
                src={product.img_url}
                alt={product.title}
                className="object-cover w-full h-full opacity-60"
              />
              {/* Circular Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
                }}
              />
            </div>

            {/* Product Title (Centered) */}
            <motion.h3
              initial={{ opacity: 0, x: -20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute top-4 left-4 md:top-8 md:left-8 text-2xl md:text-4xl text-[#f2de9b] text-effect font-bold text-left"
            >
              {product.title}
            </motion.h3>

            {/* Product Details */}
            <ProductDetails product={product} />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700"
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {firstTenProducts.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentIndex ? "bg-[#f2de9b]" : "bg-[#9ca081]"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
