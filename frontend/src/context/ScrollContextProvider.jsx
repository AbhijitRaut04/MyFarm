import React, { useEffect, useState } from "react";
import { ScrollContext } from "./Contexts";
import { throttle } from "lodash";

const ScrollContextProvider = ({ children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(1);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  useEffect(() => {
    const handleScroll = throttle(() => {
      const categoryBottom = document
        .querySelector("#category")
        ?.getBoundingClientRect().bottom;
      const searchBarTop = document
        .querySelector("#searchBar")
        ?.getBoundingClientRect().bottom;
      setIsScrolledPast(searchBarTop < categoryBottom);

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(0); // Scrolling down
      } else {
        setIsVisible(1); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    }, 1000);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <ScrollContext.Provider
      value={{ isVisible, isScrolledPast, setIsScrolledPast }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContextProvider;
