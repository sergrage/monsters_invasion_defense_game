import { useEffect, useRef, useState } from "react";

import { useOutside } from "@/hooks/useOutside";
import useFetch from "@/hooks/useFetch";
import { userUrl } from "@/endpoints/apiUrl";

import Title from "@/ui/title";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "./style.module.scss";

type TProps = {
  closeModal: () => void;
};

const PasswordModal = ({ closeModal }: TProps) => {
  const wrapperRef: React.MutableRefObject<HTMLFormElement | null> =
    useRef(null);
  useOutside({ ref: wrapperRef, outsideClick: closeModal });
  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    setTimeout(() => {
      wrapperRef.current!.closest("section")!.classList.add(style.show);
      wrapperRef.current!.classList.add(style.show);
    }, 0);
  }, []);

  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormVal({ ...formVal, [event.target.name]: event.target.value });
  };

  const errorHandler = (type: string, value: boolean) => {
    setError({ ...error, [type]: value });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (error.oldPassword || error.newPassword || error.confirmPassword) return;

    sendRequest(
      {
        url: `${userUrl}/password`,
        method: "PUT",
        body: {
          oldPassword: formVal.oldPassword,
          newPassword: formVal.newPassword,
        },
      },
      applyData,
    );
  };

  const applyData = () => {
    closeModal();
  };

  return (
    <section className={style.backdrop}>
      <form ref={wrapperRef} className={style.modal} onSubmit={onSubmitHandler}>
        <Title.H2 className={style.title} title="Change password" />

        <div className={style["input-wrapper"]}>
          <Input
            name="oldPassword"
            label="Old password"
            type="password"
            required={true}
            onChange={formChangeHandler}
            onError={val => errorHandler("oldPassword", val)}
          />
          <Input
            name="newPassword"
            label="New password"
            type="password"
            required={true}
            onChange={formChangeHandler}
            onError={val => errorHandler("newPassword", val)}
          />
          <Input
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            required={true}
            onChange={formChangeHandler}
            onError={val => errorHandler("confirmPassword", val)}
          />
        </div>

        <Button.Flat name="Change" type="submit" />
      </form>
    </section>
  );
};

export default PasswordModal;
