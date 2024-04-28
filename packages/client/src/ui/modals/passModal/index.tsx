import { useEffect, useRef } from "react";

import { useOutside } from "@/hooks/useOutside";
import { useValidate } from "@/hooks/useValidate";
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

  const { values, errors, errorMessages, handleChange } = useValidate({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setTimeout(() => {
      wrapperRef.current!.closest("section")!.classList.add(style.show);
      wrapperRef.current!.classList.add(style.show);
    }, 0);
  }, []);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (
      Object.values(errors).some(error => !!error) ||
      Object.values(values).some(value => !value)
    ) {
      return;
    }

    console.log(values);

    sendRequest(
      {
        url: `${userUrl}/password`,
        method: "PUT",
        body: {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
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
            value={values.oldPassword}
            onChange={handleChange}
            onError={errors.oldPassword}
            onErrorMessage={errorMessages.old}
          />
          <Input
            name="newPassword"
            label="New password"
            type="password"
            required={true}
            value={values.newPassword}
            onChange={handleChange}
            onError={errors.newPassword}
            onErrorMessage={errorMessages.password}
          />
          <Input
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            required={true}
            value={values.confirmPassword}
            onChange={handleChange}
            onError={errors.confirmPassword}
            onErrorMessage={errorMessages.password}
          />
        </div>

        <Button.Flat
          name="Change"
          type="submit"
          disabled={
            Object.values(errors).some(error => error) ||
            Object.values(values).some(value => !value)
          }
        />
      </form>
    </section>
  );
};

export default PasswordModal;
