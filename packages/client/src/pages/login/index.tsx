import { FC } from "react";
import { useNavigate } from "react-router";
import { redirect } from "react-router-dom";
import { routes } from "@/pages/routes";
import { useValidate } from "@/hooks/useValidate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logInThunk } from "@/store/user/actions";
import { baseYandexUrl } from "@/endpoints/apiUrl";

import Layout from "@/components/layout";
import Button from "@/ui/button";
import Input from "@/ui/input";

import style from "./style.module.scss";

type TLogin = {
  login: string;
  password: string;
};

type TServiceInfo = {
  service_id: string;
};

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, errors, errorMessages, handleChange } = useValidate({
    login: "",
    password: "",
  });

  const oAuthYandex = async () => {
    const REDIRECT_URI = window.location.origin + "/";
    const GET_SERVICE_ID_URI = "/oauth/yandex/service-id";

    const AUTH_AUTHORIZE_URI = "https://oauth.yandex.ru/authorize";

    const getServiceIdparams = new URLSearchParams({
      redirect_uri: REDIRECT_URI,
    });

    try {
      let response = await fetch(
        baseYandexUrl + GET_SERVICE_ID_URI + "?" + getServiceIdparams,
      );

      let json = await response.json();

      const serviceId = json.service_id;

      const authparams = new URLSearchParams({
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        client_id: serviceId,
      });

      window.location.replace(AUTH_AUTHORIZE_URI + "?" + authparams);
    } catch (err) {
      console.log(err);
    }
  };

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

    dispatch(logInThunk(values as TLogin));
  };

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>Log in</h1>
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
          <button onClick={oAuthYandex}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
            >
              <path
                d="M2.04 12c0-5.523 4.476-10 10-10 5.522 0 10 4.477 10 10s-4.478 10-10 10c-5.524 0-10-4.477-10-10z"
                fill="#FC3F1D"
              />
              <path
                d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
                fill="#fff"
              />
            </svg>
          </button>
        </div>
      </form>
    </Layout.Page>
  );
};

export default LoginPage;
