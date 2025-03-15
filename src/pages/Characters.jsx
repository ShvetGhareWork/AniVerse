import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../App.css";
import ShopContext from "../context/ShopContext";
import AnimeNavbar from "../components/Navbar";
import Footer from "../components/Footer";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Characters() {
  const { Character } = useContext(ShopContext);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, [selectedLetter]);

  const animeCharacters = Character;
  const filteredCharacters = animeCharacters.filter((char) =>
    char.romji?.startsWith(selectedLetter)
  );

  return (
    <>
      <AnimeNavbar />
      <div className="min-h-screen bg-gradient-to-b from-[#f2de9b] to-[#202216] p-5">
        <h1 className="text-4xl font-bold text-center mb-6 text-[#202216]">
          Anime Characters
        </h1>
        <div className="flex justify-center gap-2 flex-wrap mb-6">
          {alphabet.map((letter) => (
            <motion.button
              key={letter}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedLetter(letter)}
              className={`px-3 py-1 border rounded-lg ${
                selectedLetter === letter
                  ? "bg-[#202216] text-[#f2de9b]"
                  : "bg-white text-[#202216]"
              } transition`}
            >
              {letter}
            </motion.button>
          ))}
        </div>

        {loading ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[...Array(6)].map((_, index) => (
              <motion.div
                key={index}
                className="bg-[#202216] border border-[#f2de9b] shadow-lg rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-48 bg-[#f2de9b]" />
                <div className="p-4">
                  <div className="h-6 bg-[#f2de9b] rounded w-3/4 mb-2" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/2 mb-1" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/3 mb-1" />
                  <div className="h-4 bg-[#f2de9b] rounded w-1/4 mb-1" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : filteredCharacters.length ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredCharacters.map((char) => (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#202216] w-full shadow-lg rounded-2xl overflow-hidden"
              >
                <img
                  src={char.image}
                  alt={char.romji}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-[#f2de9b]">
                    {char.romji}
                  </h2>
                  <p className="text-[#f2de9b]">Eye Color: {char.eye_color}</p>
                  <p className="text-[#f2de9b]">
                    Hair Color: {char.hair_color}
                  </p>
                  <p className="text-[#f2de9b]">
                    Hair Length: {char.hair_length}
                  </p>
                  <p className="text-[#f2de9b]">Age: {char.age}</p>
                  <p className="text-[#f2de9b]">Sex: {char.sex}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No characters found.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}
