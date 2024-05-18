import { FC, useEffect } from "react";
import { useNavigate } from "react-router";

import { routes } from "@/pages/routes";
import { useValidate } from "@/hooks/useValidate";
import useFetch from "@/hooks/useFetch";
import useAuth from "@/hooks/useAuth";

import Layout from "@/components/layout";
import Button from "@/ui/button";
import Input from "@/ui/input";

import { authUrl } from "@/endpoints/apiUrl";
import style from "./style.module.scss";

const LoginPage: FC = () => {
  const navigate = useNavigate();

  const sendRequest = useFetch();
  const { isAuth, updateAuth } = useAuth();

  const { values, errors, errorMessages, handleChange } = useValidate({
    login: "",
    password: "",
  });

  // при первой отрисовке если позволяют куки то получаем данные юзера с дальнейшим редиректом
  useEffect(() => {
    if (isAuth) {
      navigate(routes.gameStart);
      return;
    }
    updateAuth();
  }, [isAuth]);

  const onClickHandler = () => {
    navigate(routes.signup);
  };

  const handleSubmit = (event: React.FormEvent) => {
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
        url: `${authUrl}/signin`,
        method: "POST",
        body: {
          login: values.login,
          password: values.password,
        },
      },
      applyData,
    );
  };

  // запросить данные пользователя с дальнейшим редиректом
  const applyData = () => {
    updateAuth();
  };

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>Please log in</h1>
        <div className={style["inputs-wrapper"]}>
          <Input
            name="login"
            label="Login"
            required={true}
            value={values.login}
            onChange={handleChange}
            onError={errors.login}
            onErrorMessage={errorMessages.login}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            required={true}
            value={values.password}
            onChange={handleChange}
            onError={errors.password}
            onErrorMessage={errorMessages.password}
          />
        </div>
        <div className={style["btns-wrapper"]}>
          <Button.Flat
            name="Login"
            type="submit"
            positive={true}
            disabled={
              Object.values(errors).some(error => error) ||
              Object.values(values).some(value => !value)
            }
          />
          <Button.Flat
            name="Signup"
            onClick={onClickHandler}
            transparent={true}
          />
        </div>
      </form>
    </Layout.Page>
  );
};

export default LoginPage;
