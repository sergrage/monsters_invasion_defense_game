import type { ReactPortal, ReactNode } from "react";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

// implementation of the facade pattern
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // creates only one instance of root
  const rootEl = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    // adds root to body
    document.body.prepend(rootEl);

    // trigger transition effect on opening
    setTimeout(() => {
      setIsOpen(true);
    }, 0);

    return (): void => {
      // after unmounting the component - removes the root created earlier
      document.body.removeChild(rootEl);
    };
  }, []);

  // returns an object with function that will allow you to use the portal
  return {
    // anonymous function is an implementation of the factory method pattern
    render: (children: ReactNode): ReactPortal | null =>
      createPortal(children, rootEl),
    isOpen,
  };
};

export { useModal };
