import { useState, useEffect } from "react";

const getCharacterLimit = (width: number) => {
  if (width < 734) return { title: 50, description: 90 };
  if (width < 1069) return { title: 50, description: 80 };
  return { title: 80, description: 200 };
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
