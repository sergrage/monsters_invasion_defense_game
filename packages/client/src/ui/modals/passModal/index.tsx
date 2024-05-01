import { ChangeEvent, useRef, useState } from "react";
import cn from "classnames";

import { useOutside } from "@/hooks/useOutside";
import { useModal } from "@/hooks/useModal";
import useFetch from "@/hooks/useFetch";

import { userUrl } from "@/endpoints/apiUrl";

import Layout from "@/components/layout";
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

// Временное решение, пока не закончен ValidationHook
import {
  EMPTY_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
} from "@/constants";

const validationMessages = {
  oldPassword: EMPTY_VALIDATION_MESSAGE,
  newPassword: PASSWORD_VALIDATION_MESSAGE,
  confirmPassword: PASSWORD_VALIDATION_MESSAGE,
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
  const modalRef: React.MutableRefObject<HTMLFormElement | null> = useRef(null);

  const isClose = useOutside(modalRef, closeModal);
  const { render, isOpen } = useModal();

  const sendRequest = useFetch();

  const [values, setValues] = useState<IValues>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<IErrors>({});
  const [errorMessages, setErrorMessages] = useState<IMessages>({});

  // временное решение пока не закончен ValidationHook
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

      const newErrorMessages: IMessages = {
        ...errorMessages,
        [name]: validationMessages[name as keyof typeof validationMessages],
      };
      setErrorMessages(newErrorMessages);
    }
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // Если есть ошибка валидации или пустые значения - выход
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

  return render(
    <Layout.Backdrop className={cn({ [style.show]: isOpen && !isClose })}>
      <form
        ref={modalRef}
        className={cn(style.modal, { [style.show]: isOpen && !isClose })}
        onSubmit={onSubmitHandler}
      >
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
            onErrorMessage={errorMessages.oldPassword}
          />
          <Input
            name="newPassword"
            label="New password"
            type="password"
            required={true}
            value={values.newPassword}
            onChange={handleChange}
            onError={errors.newPassword}
            onErrorMessage={errorMessages.newPassword}
          />
          <Input
            name="confirmPassword"
            label="Confirm new password"
            type="password"
            required={true}
            value={values.confirmPassword}
            onChange={handleChange}
            onError={errors.confirmPassword}
            onErrorMessage={errorMessages.confirmPassword}
          />
        </div>

        <Button.Flat
          name="Change"
          type="submit"
          positive={true}
          disabled={
            Object.values(errors).some(error => error) ||
            Object.values(values).some(value => !value)
          }
        />
      </form>
    </Layout.Backdrop>,
  );
};

export default PasswordModal;
