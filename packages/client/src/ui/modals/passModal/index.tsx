import { ChangeEvent, useState } from "react";

import useFetch from "@/hooks/useFetch";

import { userUrl } from "@/endpoints/apiUrl";

import FormModal from "../formModal";
import Title from "@/ui/title";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "./style.module.scss";

type TProps = {
  closeModal: () => void;
};

interface IValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface IErrors {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

interface IMessages {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
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
  const sendRequest = useFetch();

  const [values, setValues] = useState<IValues>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<IErrors>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errorMessages, setErrorMessages] = useState<IMessages>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  const handleSubmit = () => {
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

  return (
    <FormModal
      modalClassName={style.modal}
      onSubmit={handleSubmit}
      onClose={closeModal}
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
    </FormModal>
  );
};

export default PasswordModal;
