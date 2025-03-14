import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import "../App.css";
import ScrollFloat from "../ReactBits/ScrollText.jsx";
import GenreGrid from "./GenreGrid.jsx";

const AnimatedItem = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      className="mb-4 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
    "Item 9",
    "Item 10",
    "Item 11",
    "Item 12",
    "Item 13",
    "Item 14",
    "Item 15",
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = false,
  initialSelectedIndex = -1,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    );
  };

  // Keyboard navigation: arrow keys, tab, and enter selection
  useEffect(() => {
    if (!enableArrowNavigation) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  // Scroll the selected item into view if needed
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    );
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: "smooth" });
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: "smooth",
        });
      }
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className="flex items-center justify-between">
      <GenreGrid />
      <div>
        <div className="bg-[#202216] border border-[#f2de9b] rounded-lg mr-7">
          <div className="pl-4 text-xl font-semibold text-[#f2de9b]">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
            >
              Top Genres
            </ScrollFloat>
          </div>
          <div className={`relative w-[500px] ${className}`}>
            <div
              ref={listRef}
              className={`max-h-[400px] overflow-y-auto p-4 ${
                displayScrollbar ? "no-scrollbar" : "no-scrollbar"
              }`}
              onScroll={handleScroll}
              style={{
                scrollbarWidth: "none",
                scrollbarColor: "",
              }}
            >
              {items.map((item, index) => (
                <AnimatedItem
                  key={index}
                  delay={0.1}
                  index={index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    setSelectedIndex(index);
                    if (onItemSelect) {
                      onItemSelect(item, index);
                    }
                  }}
                >
                  <div
                    className={`p-4 bg-[#111] rounded-lg ${
                      selectedIndex === index ? "bg-[#222]" : ""
                    } ${itemClassName}`}
                  >
                    <p className="text-white m-0">{item}</p>
                  </div>
                </AnimatedItem>
              ))}
            </div>
            {showGradients && (
              <>
                <div
                  className="absolute top-0 left-0 right-0 h-[50px] bg-gradient-to-b pointer-events-none transition-opacity duration-300 ease"
                  style={{ opacity: topGradientOpacity }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t pointer-events-none transition-opacity duration-300 ease"
                  style={{ opacity: bottomGradientOpacity }}
                ></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedList;
