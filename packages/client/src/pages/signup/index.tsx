import { FC } from "react";
import { useNavigate } from "react-router";

import { routes } from "@/pages/routes";
import { useValidate } from "@/hooks/useValidate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { signUpThunk } from "@/store/user/actions";

import Layout from "@/components/layout";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "../login/style.module.scss";
import { useTranslation } from "react-i18next";
import { TRANSLATIONS } from "@/constants/translations";

type TSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, errors, errorMessages, handleChange } = useValidate({
    email: "",
    login: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const onClickHandler = () => {
    navigate(routes.login);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Если есть ошибка валидации или пустые значения - выход
    if (
      Object.values(errors).some(error => !!error) ||
      Object.values(values).some(value => !value)
    ) {
      return;
    }

    dispatch(
      signUpThunk({
        first_name: values.firstName,
        second_name: values.lastName,
        login: values.login,
        email: values.email,
        password: values.password,
        phone: values.phone,
      } as TSignUp),
    );
  };

  const { t } = useTranslation();

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>Sign up</h1>
        <div className={style["inputs-wrapper"]}>
          <Input
            name="email"
            label={t(TRANSLATIONS.EMAIL)}
            value={values.email}
            onChange={handleChange}
            onError={errors.email}
            onErrorMessage={errorMessages.email}
            required={true}
            autocomplete="email"
          />
          <Input
            name="login"
            label={t(TRANSLATIONS.LOGIN)}
            value={values.login}
            onChange={handleChange}
            onError={errors.login}
            onErrorMessage={errorMessages.login}
            required={true}
            autocomplete="nickname"
          />
          <Input
            name="firstName"
            label={t(TRANSLATIONS.FIRST_NAME)}
            value={values.firstName}
            onChange={handleChange}
            onError={errors.firstName}
            onErrorMessage={errorMessages.firstName}
            required={true}
            autocomplete="given-name"
          />
          <Input
            name="lastName"
            label={t(TRANSLATIONS.LAST_NAME)}
            value={values.lastName}
            onChange={handleChange}
            onError={errors.lastName}
            onErrorMessage={errorMessages.lastName}
            autocomplete="family-name"
          />
          <Input
            name="phone"
            label={t(TRANSLATIONS.PHONE)}
            value={values.phone}
            onChange={handleChange}
            onError={errors.phone}
            onErrorMessage={errorMessages.phone}
            autocomplete="tel"
          />
          <Input
            name="password"
            label={t(TRANSLATIONS.PASSWORD)}
            type="password"
            value={values.password}
            onChange={handleChange}
            onError={errors.password}
            onErrorMessage={errorMessages.password}
            required={true}
            autocomplete="new-password"
          />
          <Input
            name="confirmPassword"
            label={t(TRANSLATIONS.CONFIRM_PASSWORD)}
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            onError={errors.confirmPassword}
            onErrorMessage={errorMessages.password}
            required={true}
          />
        </div>
        <div className={style["btns-wrapper"]}>
          <Button.Flat
            name="SignUp"
            type="submit"
            positive={true}
            disabled={
              Object.values(errors).some(error => error) ||
              Object.values(values).some(value => !value)
            }
          />
          <Button.Flat
            name="Login"
            onClick={onClickHandler}
            transparent={true}
          />
        </div>
      </form>
    </Layout.Page>
  );
};

export default RegisterPage;
