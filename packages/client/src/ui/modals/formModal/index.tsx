import { useRef } from "react";
import cn from "classnames";

import { useOutside } from "@/hooks/useOutside";
import { useModal } from "@/hooks/useModal";

import Layout from "@/components/layout";

import style from "./style.module.scss";

type TProps = {
  children: React.ReactNode;
  modalClassName?: string;
  onSubmit: (event: React.FormEvent) => void;
  onClose: () => void;
};

const FormModal = ({ children, modalClassName, onSubmit, onClose }: TProps) => {
  const modalRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  const isClose = useOutside(modalRef, onClose);
  const { render, isOpen } = useModal();

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(event);
  };

  return render(
    <Layout.Backdrop className={cn({ [style.show]: isOpen && !isClose })}>
      <form
        ref={modalRef}
        className={cn(style.modal, {
          [style.show]: isOpen && !isClose,
          [modalClassName!]: modalClassName,
        })}
        onSubmit={onSubmitHandler}
      >
        {children}
      </form>
    </Layout.Backdrop>,
  );
};

export default FormModal;
