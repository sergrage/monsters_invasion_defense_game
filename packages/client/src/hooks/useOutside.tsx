import React, { useEffect } from "react";

interface Props {
  ref: React.MutableRefObject<Node | null>;
  outsideClick: () => void;
}

export function useOutside(props: Props): void {
  useEffect(() => {
    const handleClickOutside = (
      e: React.BaseSyntheticEvent | MouseEvent,
    ): void => {
      if (props.ref?.current) {
        if (!props.ref.current.contains(e.target)) {
          props.outsideClick();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return (): void => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.ref]);
}
