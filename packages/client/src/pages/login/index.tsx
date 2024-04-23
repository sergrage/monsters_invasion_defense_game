import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { routes } from "@/pages/routes";
import { authUrl } from "@/endpoints/apiUrl";
import useFetch from "@/hooks/useFetch";

import Layout from "@/components/Layout";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "./style.module.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({ login: "", password: "" });
  const [error, setError] = useState({ login: false, password: false });

  // при первой отрисовке если позволяют куки то получаем данные юзера с дальнейшим редиректом
  useEffect(() => {
    applyData();
  }, []);

  const onClickHandler = () => {
    navigate(routes.signup);
  };

  // обновляем стэйт формы при изменении инпутов
  const formChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormVal({ ...formVal, [event.target.name]: event.target.value });
  };

  const errorHandler = (type: string, value: boolean) => {
    setError({ ...error, [type]: value });
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formVal.login || !formVal.password) return;
    if (error.login || error.password) return;

    sendRequest(
      {
        url: `${authUrl}/signin`,
        method: "POST",
        body: formVal,
      },
      applyData,
    );
  };

  // запросить данные пользователя с дальнейшим редиректом
  const applyData = () => {
    sendRequest({ url: `${authUrl}/user` });
    // navigate(routes.game) или navigate(routes.forum) ???
  };

  return (
    <Layout.Page className={style.wrapper}>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <h1 className={style.title}>Please log in</h1>
        <div className={style["inputs-wrapper"]}>
          <Input
            name="login"
            label="Login"
            required={true}
            onChange={formChangeHandler}
            onError={val => errorHandler("login", val)}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            required={true}
            onChange={formChangeHandler}
            onError={val => errorHandler("password", val)}
          />
        </div>
        <div className={style["btns-wrapper"]}>
          <Button.Flat
            name="Login"
            type="submit"
            disabled={error.login || error.password}
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
