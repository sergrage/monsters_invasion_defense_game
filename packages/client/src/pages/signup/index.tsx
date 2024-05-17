import { FC } from "react";
import { useNavigate } from "react-router";

import { routes } from "@/pages/routes";
import { useValidate } from "@/hooks/useValidate";

import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "../login/style.module.scss";
import Layout from "@/components/layout";

const RegisterPage: FC = () => {
  const navigate = useNavigate();

  const { values, errors, errorMessages, handleChange } = useValidate({
    email: "",
    login: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const onClickHandler = () => {
    navigate(routes.login);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Register!");
  };

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>Please sign up</h1>
        <div className={style["inputs-wrapper"]}>
          <Input
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onError={errors.email}
            onErrorMessage={errorMessages.email}
            required={true}
            autocomplete="email"
          />
          <Input
            name="login"
            label="Login"
            value={values.login}
            onChange={handleChange}
            onError={errors.login}
            onErrorMessage={errorMessages.login}
            required={true}
            autocomplete="nickname"
          />
          <Input
            name="firstName"
            label="First Name"
            value={values.firstName}
            onChange={handleChange}
            onError={errors.firstName}
            onErrorMessage={errorMessages.firstName}
            required={true}
            autocomplete="given-name"
          />
          <Input
            name="lastName"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange}
            autocomplete="family-name"
          />
          <Input
            name="password"
            label="Password"
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
            label="Confirm Password"
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
