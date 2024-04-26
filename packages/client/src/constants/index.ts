export enum Messages {
  hello = "Привет из констант",
}

//Валидация
export const LOGIN_VALIDATION_MESSAGE =
  "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)";
export const PASSWORD_VALIDATION_MESSAGE =
  "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра";
export const PHONE_VALIDATION_MESSAGE =
  "Tелефон в формате 8(ХХХ)ХХХ-ХХХХ. от 10 до 15 символов, состоит из цифр, может начинается с плюса";
export const NAME_VALIDATION_MESSAGE =
  "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)";
export const MAIL_VALIDATION_MESSAGE = "EMail в формате user@usermail.ru";
export const EMPTY_VALIDATION_MESSAGE = "Поле не может быть пустым";
