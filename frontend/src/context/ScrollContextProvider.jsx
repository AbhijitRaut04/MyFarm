import React, { useEffect, useState } from "react";
import { ScrollContext } from "./Contexts";
import { throttle } from "lodash";

const ScrollContextProvider = ({ children }) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(1);
  const [isCreatePostDisplay, setIsCreatePostDisplay] = useState(1);
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [calculateVisibility, setCalculateVisibility] = useState(true);

  useEffect(() => {
    if (calculateVisibility) {
      const handleScroll = throttle(() => {
        const headerSectionBottom = document
          .querySelector("#headerSection")
          ?.getBoundingClientRect().bottom;
        const searchBarTop = document
          .querySelector("#searchBar")
          ?.getBoundingClientRect().bottom;
        setIsScrolledPast(searchBarTop < headerSectionBottom);

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
    } else {
      setIsVisible(0);
    }
  }, [lastScrollY, calculateVisibility]);

  return (
    <ScrollContext.Provider
      value={{
        isVisible,
        setIsVisible,
        isCreatePostDisplay,
        setIsCreatePostDisplay,
        isScrolledPast,
        setIsScrolledPast,
        setCalculateVisibility,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollContextProvider;
