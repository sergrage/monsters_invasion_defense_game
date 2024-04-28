import { ChangeEvent, useEffect, useRef, useState } from "react";

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

interface IValues {
  [value: string]: string;
}

interface IErrors {
  [key: string]: boolean;
}

interface IMessages {
  [key: string]: string;
}

// Временное решение, пока не закончен ValidateHook
import {
  EMPTY_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from "@/constants";

const validationMessages = {
  emptyRow: EMPTY_VALIDATION_MESSAGE,
  password: PASSWORD_VALIDATION_MESSAGE,
};
const passwordValidator = new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/);
const validationRules = {
  oldPassword: (value: string) => !!value.trim(),
  newPassword: (value: string) =>
    !!value.trim() && passwordValidator.test(value),
  confirmPassword: (value: string) =>
    !!value.trim() && passwordValidator.test(value),
};

const PasswordModal = ({ closeModal }: TProps) => {
  const wrapperRef: React.MutableRefObject<HTMLFormElement | null> =
    useRef(null);
  useOutside({ ref: wrapperRef, outsideClick: closeModal });
  const sendRequest = useFetch();

  const [values, setValues] = useState<IValues>({});
  const [errors, setErrors] = useState<IErrors>({});
  const [errorMessages, setErrorMessages] = useState<IMessages>({});

  // transition effect при открытии модального окна
  useEffect(() => {
    setTimeout(() => {
      wrapperRef.current!.closest("section")!.classList.add(style.show);
      wrapperRef.current!.classList.add(style.show);
    }, 0);
  }, []);

  // временное решение пока не закончен ValidateHook
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setValues({ ...values, [name]: value });

    // Если имя поля есть в объекте валидации - то выполняем валидацию
    // и обновляем стэйт ошибок и стэйт сообщений об ошибках
    if (name in validationRules) {
      const newErrors: IErrors = {
        ...errors,
        [name]: !validationRules[name as keyof typeof validationRules](value),
      };
      setErrors(newErrors);

      // Создаем новый объект сообщений об ошибках
      const newErrorMessages: IMessages = {
        ...errorMessages,
        [name]: validationMessages[name as keyof typeof validationMessages],
      };
      setErrorMessages(newErrorMessages);
    }
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Если есть хотя бы одна ошибка валидации или пустые значения - выходимуем сразу
    if (
      Object.values(errors).some(error => !!error) ||
      Object.values(values).some(value => !value)
    ) {
      return;
    }

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
