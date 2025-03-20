import { useState, useEffect } from "react";

const getCharacterLimit = (width: number) => {
  if (width < 734) return { title: 20, description: 50 };
  if (width < 1069) return { title: 30, description: 80 };
  return { title: 50, description: 120 };
};

export const useCharacterLimit = () => {
  const [charLimit, setCharLimit] = useState(getCharacterLimit(0));

  useEffect(() => {
    const handleResize = () => setCharLimit(getCharacterLimit(window.innerWidth));
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return charLimit;
};
