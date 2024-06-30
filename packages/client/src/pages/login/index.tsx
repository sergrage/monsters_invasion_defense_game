import { FC, useEffect } from "react";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet";

import { routes } from "@/pages/routes";
import { useValidate } from "@/hooks/useValidate";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getUserThunk, logInThunk } from "@/store/user/actions";
import { logOutThunk } from "@/store/user/actions";
import { oAuthYandex } from "@/utils/oAuth";
import IconButton from "@/ui/button/iconBtn";
import Layout from "@/components/layout";
import Button from "@/ui/button";
import Input from "@/ui/input";
import yandexIcon from "@/assets/icons/yandex.svg";
import style from "./style.module.scss";
import { getUserState } from "@/store/user/selector";
import { useAppSelector } from "@/hooks/useAppSelector";

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

  const isAuth = useAppSelector(getUserState).isAuth;

  useEffect(() => {
    if (!isAuth) return;

    navigate(routes.gameStart);
  }, [isAuth]);

  const { values, errors, errorMessages, handleChange } = useValidate({
    login: "",
    password: "",
  });

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

  useEffect(() => {
    async function getUser() {
      const user = await dispatch(getUserThunk());
    }

    getUser();
  }, []);

  const oAuthYandexHandler = () => {
    dispatch(logOutThunk()).finally(() => {
      oAuthYandex();
    });
  };

  return (
    <Layout.Page className={style.wrapper} pageClass={style.page}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Log in towers &#x1F611;</title>
        <meta name="description" content="Log in" />
      </Helmet>

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
          <IconButton
            name={"OAuth"}
            icon={yandexIcon}
            onClick={oAuthYandexHandler}
            className={style.yandexBtn}
          />
        </div>
      </form>
    </Layout.Page>
  );
};

export default LoginPage;
