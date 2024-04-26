import {
  EMPTY_VALIDATION_MESSAGE,
  LOGIN_VALIDATION_MESSAGE,
  MAIL_VALIDATION_MESSAGE,
  NAME_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
  PHONE_VALIDATION_MESSAGE,
} from "@/constants";
import { ChangeEvent, useState } from "react";

interface IValues {
  [value: string]: string;
}

interface IErrors {
  [key: string]: boolean;
}

interface IMessages {
  [key: string]: string;
}

const loginValidator = new RegExp(/^[\w-]{3,20}$/);
const nameValidator = new RegExp(/^[A-ZА-Я][a-zA-ZА-Я-]*$/);
const phoneValidator = new RegExp(/^\+?\d{10,15}$/);
const passwordValidator = new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/);
const mailValidator = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const validationRules = {
  emrtyRow: (value: string) => !!value.trim(),
  email: (value: string) => !!value.trim() && mailValidator.test(value),
  phone: (value: string) => !!value.trim() && phoneValidator.test(value),
  login: (value: string) => !!value.trim() && loginValidator.test(value),
  firstName: (value: string) => !!value.trim() && nameValidator.test(value),
  password: (value: string) => !!value.trim() && passwordValidator.test(value),
  confirmPassword: (value: string) =>
    !!value.trim() && passwordValidator.test(value),
};

const validationMessages = {
  emrtyRow: EMPTY_VALIDATION_MESSAGE,
  email: MAIL_VALIDATION_MESSAGE,
  phone: PHONE_VALIDATION_MESSAGE,
  login: LOGIN_VALIDATION_MESSAGE,
  firstName: NAME_VALIDATION_MESSAGE,
  password: PASSWORD_VALIDATION_MESSAGE,
  confirmPassword: PASSWORD_VALIDATION_MESSAGE,
};

export function useValidate(inputValues: IValues = {}) {
  const [values, setValues] = useState<IValues>(inputValues);
  const [errors, setErrors] = useState<IErrors>({});
  const [errorMessages, setErrorMessages] = useState<IMessages>({});
  console.log("🚀 ~ useValidate ~ errorMessages:", errorMessages);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    if (name in validationRules) {
      setErrors({
        ...errors,
        [name]: !validationRules[name as keyof typeof validationRules](value),
      });
      setErrorMessages({
        ...errorMessages,
        [name]: validationMessages[name as keyof typeof validationMessages],
      });
    }
  };

  return { values, errors, errorMessages, handleChange };
}
