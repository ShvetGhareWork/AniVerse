import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function AnimeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Home", "Anime", "Manga", "Characters", "About"];

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-br from-[#202216] via-[#2c2f23] to-[#4a4d39] text-[#f2de9b] shadow-lg">
      {/* Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-[#f2de9b] tracking-wide cursor-pointer"
          >
            AniVerse
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.1, color: "#9ca081" }}
                className="text-lg font-medium hover:text-[#9ca081] transition duration-300"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-[#9ca081]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden absolute top-16 left-0 w-full bg-[#202216] bg-opacity-90 shadow-lg"
        >
          <div className="flex flex-col items-center space-y-4 py-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.toLowerCase()}`}
                className="text-lg text-white hover:text-[#9ca081] transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
