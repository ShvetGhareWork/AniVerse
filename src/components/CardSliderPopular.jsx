import React, { useContext, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderPopular() {
  const { products } = useContext(ShopContext);
  const [scrollX, setScrollX] = useState(0);
  const controls = useAnimation();

  // Track horizontal scroll position to apply fade effect
  useEffect(() => {
    const handleScroll = (e) => {
      setScrollX(e.target.scrollLeft);
    };

    const container = document.getElementById("card-slider");
    container?.addEventListener("scroll", handleScroll);

    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  const items = products
    .map((product, index) => ({
      key: `${product.uid}-${index}`,
      image: product.img_url,
      name: product.title,
      rating: product.score,
      episodes: product.episodes,
      popular: product.popularity,
    }))
    .sort((a, b) => a.popular - b.popular)
    .slice(0, 15);

  return (
    <motion.div
      className="bg-[#f2de9b] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <div className="flex justify-start pl-12 text-[#202216] font-semibold items-start">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Top Popular
        </ScrollFloat>
      </div>

      {/* Card Slider */}
      <div
        id="card-slider"
        className="overflow-x-auto pl-12 whitespace-nowrap no-scrollbar mb-10 p-4"
      >
        <div className="flex no-scrollbar space-x-6">
          {items.map((item, index) => {
            const fadeAmount = Math.min(scrollX / 300, 1); // Adjust fade speed by changing divisor

            return (
              <motion.div
                key={item.key}
                className="w-60 bg-[#f2de9b] text-[#202216] shadow-lg rounded-lg overflow-hidden shrink-0 border border-[#202216]"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                style={{ opacity: 1 - fadeAmount }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-60 object-cover"
                />

                {/* Card Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="p-4"
                >
                  {/* Title */}
                  <h3
                    className="text-xl font-semibold truncate max-w-full"
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

                  {/* Watch Now Button */}
                  <div className="mt-4 flex flex-col items-start space-y-2">
                    <button className="bg-gradient-to-r from-[#f2de9b] to-[#c4a76b] text-[#202216] px-4 py-2 rounded-full font-bold hover:from-[#c4a76b] hover:to-[#f2de9b] transition">
                      Watch Now
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
