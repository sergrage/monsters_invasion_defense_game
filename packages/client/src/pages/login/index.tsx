import { FC, useEffect, useState } from "react";

import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";
import { authUrl } from "@/endpoints/apiUrl";

import useFetch from "@/hooks/useFetch";

import FlatButton from "@/ui/flat-button";
import ExoticInput from "@/ui/exotic-input";

import style from "./style.module.scss";

function LoginPage() {
  const navigate = useNavigate();
  const sendRequest = useFetch();

  const [formVal, setFormVal] = useState({ login: "", password: "" });
  const [hasError, setHasError] = useState(false);

  // при первой отрисовке если позволяют куки то получаем данные юзера с дальнейшим редиректом
  useEffect(() => {
    applyData();
  }, []);

  function onClickHandler() {
    navigate(routes.signup);
  }

  // обновляем стэйт формы при изменении инпутов
  function formChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setFormVal({ ...formVal, [event.target.name]: event.target.value });
  }

  function onSubmitHandler(event: React.FormEvent) {
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
  }

  function applyData(data?: any) {
    if (data) {
      console.log(data);
    }

    sendRequest({ url: `${authUrl}/user` });
    // navigate(routes.game) или navigate(routes.forum) ???
  }

  return (
    // убрал layout.page т.к. с ним аполучается 3 х вложенность
    // main->page->container, оно нам необходимо?
    <form className={style.form} onSubmit={onSubmitHandler}>
      <h1>Please auth</h1>

      <div className={style["form__inputs-wrapper"]}>
        <ExoticInput
          name="login"
          label="Login"
          required={true}
          onChange={formChangeHandler}
          onError={val => setHasError(val)}
        />
        <ExoticInput
          name="password"
          label="Password"
          type="password"
          required={true}
          onChange={formChangeHandler}
          onError={val => setHasError(val)}
        />
      </div>

      <div className={style["form__btns-wrapper"]}>
        <FlatButton name="Login" type="submit" />
        <FlatButton name="Signup" onClick={onClickHandler} transparent={true} />
      </div>
    </form>
  );
}

export default LoginPage;
