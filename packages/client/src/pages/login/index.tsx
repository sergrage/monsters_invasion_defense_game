import React, { FC, useEffect } from "react";

import style from "./style.module.scss";
import Title from "@/ui/title";
import { useNavigate } from "react-router";
import { routes } from "@/pages/routes";
import Layout from "@/components/Layout";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);

  const onClickHandler = () => {
    navigate(routes.signup);
  };
  return (
    <Layout.Page>
      <Title.H2 title={"Страница авторизации"} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,
        architecto consectetur culpa dicta dignissimos dolorem eius eos fugiat
        harum libero natus numquam quae, sapiente tempora, ut vel velit vitae
        voluptates.
      </p>

      <button onClick={onClickHandler}>to Sign Up Page</button>
    </Layout.Page>
  );
};

export default LoginPage;
