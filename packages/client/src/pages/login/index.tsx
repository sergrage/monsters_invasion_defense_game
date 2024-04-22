import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { routes } from "@/pages/routes";
import { authUrl } from "@/endpoints/apiUrl";
import useFetch from "@/hooks/useFetch";

import Layout from "@/components/Layout";
import FlatButton from "@/ui/flatButton";
import Input from "@/ui/input";

import style from "./style.module.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({ login: "", password: "" });
  const [hasError, setHasError] = useState(false);

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

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (hasError) return;
    if (!formVal.login || !formVal.password) return;

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
    <Layout.Page className={style["login-page"]}>
      <form className={style.form} onSubmit={onSubmitHandler}>
        <h1 className={style["form__title"]}>Please log in</h1>
        <div className={style["form__inputs-wrapper"]}>
          <Input
            name="login"
            label="Login"
            required={true}
            onChange={formChangeHandler}
            onError={val => setHasError(val)}
          />
          <Input
            name="password"
            label="Password"
            type="password"
            required={true}
            onChange={formChangeHandler}
            onError={val => setHasError(val)}
          />
        </div>
        <div className={style["form__btns-wrapper"]}>
          <FlatButton name="Login" type="submit" disabled={hasError} />
          <FlatButton
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
