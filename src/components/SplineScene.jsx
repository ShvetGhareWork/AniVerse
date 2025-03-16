import Spline from "@splinetool/react-spline";
import AnimeNavbar from "./Navbar";
import { useEffect, useState } from "react";

export default function App() {
  const [splineSize, setSplineSize] = useState({
    width: "100%",
    height: "100vh",
  });

  // Adjust size on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSplineSize({ width: "100%", height: "100vh" });
      } else {
        setSplineSize({ width: "100%", height: "100vh" });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <AnimeNavbar />
      <div
        style={{
          width: splineSize.width,
          height: splineSize.height,
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        <Spline scene="https://prod.spline.design/HdQddL5ZyI1whn5Q/scene.splinecode" />
      </div>
    </>
  );
}
