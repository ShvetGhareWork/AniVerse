import React, { useContext } from "react";
import { motion } from "framer-motion";
import ShopContext from "../context/ShopContext";
import ScrollFloat from "../ReactBits/ScrollText";
import "../App.css";

export default function CardSliderRanked() {
  const { products } = useContext(ShopContext);

  const items = products
    .map((product, index) => ({
      key: `${product.uid}-${index}`,
      image: product.img_url,
      name: product.title,
      rating: product.score,
      episodes: product.episodes,
      popular: product.popularity,
      rank: Number(product.ranked),
    }))
    .sort((a, b) => b.rank - a.rank)
    .slice(0, 15);

  return (
    <motion.div
      className="bg-[#202216] overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <div className="flex justify-start pl-4 text-[#f2de9b] font-semibold items-start">
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Top Ranked
        </ScrollFloat>
      </div>

      {/* Card Slider */}
      <div className="overflow-x-auto pl-4 whitespace-nowrap no-scrollbar mb-10 p-4 relative">
        <div className="flex no-scrollbar space-x-6">
          {items.map((item, index) => (
            <motion.div
              key={item.key}
              className="w-60 bg-[#202216] text-[#f2de9b] shadow-lg rounded-lg overflow-hidden shrink-0 border border-[#f2de9b]"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeOut",
              }}
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
          ))}
        </div>

        {/* Gradient Overlay for Right Fade */}
        <div className=" top-0 right-0 w-24 h-full bg-gradient-to-l from-[#202216] via-[#202216] to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
}
