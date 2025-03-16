import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderTrending() {
  const { products } = useContext(ShopContext);

  const items = products
    .map((product, index) => ({
      key: `${product.uid}-${index}`,
      image: product.img_url,
      name: product.title,
      rating: product.score,
      episodes: product.episodes,
      popular: product.popularity,
      rank: product.ranked,
      URL: product.link,
    }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 15);

  // Mobile limit 6 items, View More shows the rest
  const visibleItems = items.slice(0, 4);

  return (
    <div className="bg-[#202216] overflow-hidden relative">
      {/* Title */}
      <div className="flex justify-start pl-4 text-[#f2de9b] font-semibold items-start">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=0%"
          scrollEnd="bottom bottom-=0%"
          stagger={0.03}
        >
          Top Trending
        </ScrollFloat>
      </div>

      {/* Mobile List View | Laptop Card Slider */}
      <div className="p-4 mb-10">
        {/* Mobile View: List Layout */}
        <div className="md:hidden space-y-4">
          {visibleItems.map((item, index) => (
            <div
              key={item.key}
              className="flex items-center space-x-4 bg-[#202216] text-[#f2de9b] shadow-lg cursor-pointer rounded-lg border border-[#f2de9b] p-2"
              onClick={() => window.open(item.URL, "_blank")}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              {/* Content */}
              <div className="flex-1">
                {/* Title */}
                {/* Title */}
                <h3
                  className="text-lg font-semibold truncate overflow-hidden whitespace-nowrap max-w-full"
                  title={item.name}
                >
                  {item.name.slice(0, 20) + "..."}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-1">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-2 text-lg">{item.rating}</span>
                </div>

                {/* Episodes */}
                <div className="text-sm bg-[#f2de9b] text-[#202216] rounded-full px-3 py-1 inline-block mt-2">
                  {item.episodes} Episodes
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Laptop View: Cards Layout */}
        <div className="hidden md:flex no-scrollbar space-x-6 overflow-x-auto overflow-y-clip">
          {items.map((item, index) => (
            <div
              key={item.key}
              className="w-60 h-auto bg-[#202216] text-[#f2de9b] border-[#f2de9b] shadow-lg cursor-pointer rounded-lg overflow-hidden shrink-0 border "
              onClick={() => window.open(item.URL, "_blank")}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 md:h-60 object-cover"
              />

              {/* Card Content */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="p-4"
              >
                {/* Title */}
                <h3
                  className="text-xl font-semibold truncate max-w-full overflow-hidden whitespace-nowrap"
                  title={item.name}
                >
                  {item.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="ml-2 text-lg">{item.rating}</span>
                </div>

                {/* Episodes */}
                <div className="mt-2 text-sm bg-[#f2de9b] text-[#202216] rounded-full px-3 py-1 inline-block">
                  {item.episodes} Episodes
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* View More (Mobile Only) */}
        <div className="mt-4 flex justify-center md:hidden">
          <button className="text-[#f2de9b] from-[#202216] bg-gradient-to-r to-[#c4a76b] px-6 py-2 rounded-lg font-semibold hover:bg-[#c4a76b] transition">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
