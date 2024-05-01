import { useEffect, useState } from "react";

export function useOutside(
  ref: React.MutableRefObject<Node | null>,
  outsideClick: () => void,
): boolean {
  const [isClose, setIsClose] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | KeyboardEvent): void => {
      if (ref?.current) {
        // trigger outside click if the clicked element is not the ref element
        // and it is not a child of the ref element
        if (
          (e instanceof MouseEvent &&
            !ref.current.contains(e.target as Node)) ||
          (e instanceof KeyboardEvent && e.key === "Escape")
        ) {
          // trigger transition effect on closing
          setIsClose(true);

          // give time for the transition
          setTimeout(() => outsideClick(), 200);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleClickOutside);
    };
  }, [ref]);

  return isClose;
}
