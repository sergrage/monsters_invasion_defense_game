import { useEffect, useState } from "react";

export function useOutside(
  ref: React.MutableRefObject<Node | null>,
  outsideClick: () => void,
): boolean {
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    const handleClickOutside = (
      e: React.BaseSyntheticEvent | MouseEvent,
    ): void => {
      if (ref?.current) {
        // trigger outside click if the clicked element is not the ref element
        // and it is not a child of the ref element
        if (!ref.current.contains(e.target)) {
          // trigger transition effect on closing
          setIsClose(true);

          // give time for the transition
          setTimeout(() => outsideClick(), 200);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClose;
}
