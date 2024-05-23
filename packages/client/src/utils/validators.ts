import {
  EMPTY_VALIDATION_MESSAGE,
  LOGIN_VALIDATION_MESSAGE,
  MAIL_VALIDATION_MESSAGE,
  NAME_VALIDATION_MESSAGE,
  PASSWORD_VALIDATION_MESSAGE,
  PHONE_VALIDATION_MESSAGE,
} from "@/constants";

const loginValidator = new RegExp(/^[\w-]{3,20}$/);
const nameValidator = new RegExp(/^[A-ZА-Я][a-zA-ZА-Я-]*$/);
const phoneValidator = new RegExp(/^\+?\d{10,15}$/);
const passwordValidator = new RegExp(/^(?=.*[A-Z])(?=.*\d).{8,40}$/);
const mailValidator = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const validationRules = {
  emptyRow: {
    validator: (value: string) => !!value.trim(),
    errorMessage: EMPTY_VALIDATION_MESSAGE,
  },
  email: {
    validator: (value: string) => !!value.trim() && mailValidator.test(value),
    errorMessage: MAIL_VALIDATION_MESSAGE,
  },
  phone: {
    validator: (value: string) => !!value.trim() && phoneValidator.test(value),
    errorMessage: PHONE_VALIDATION_MESSAGE,
  },
  login: {
    validator: (value: string) => !!value.trim() && loginValidator.test(value),
    errorMessage: LOGIN_VALIDATION_MESSAGE,
  },
  firstName: {
    validator: (value: string) => !!value.trim() && nameValidator.test(value),
    errorMessage: NAME_VALIDATION_MESSAGE,
  },
  lastName: {
    validator: (value: string) => !!value.trim() && nameValidator.test(value),
    errorMessage: NAME_VALIDATION_MESSAGE,
  },
  password: {
    validator: (value: string) =>
      !!value.trim() && passwordValidator.test(value),
    errorMessage: PASSWORD_VALIDATION_MESSAGE,
  },
  confirmPassword: {
    validator: (value: string) =>
      !!value.trim() && passwordValidator.test(value),
    errorMessage: PASSWORD_VALIDATION_MESSAGE,
  },
  oldPassword: {
    validator: (value: string) => !!value.trim(),
    errorMessage: EMPTY_VALIDATION_MESSAGE,
  },
};
