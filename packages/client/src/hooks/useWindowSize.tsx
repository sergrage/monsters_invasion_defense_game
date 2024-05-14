import { useEffect, useState } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      setWindowSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  return windowSize;
}

export default useWindowSize;
