import { useState, useCallback } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = useCallback(() => {
    setIsOpen(state => !state);
  }, []);

  return {
    isOpen,
    toggleModal,
  };
};

export default useModal;
