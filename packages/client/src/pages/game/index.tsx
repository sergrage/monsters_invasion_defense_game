import React, { FC } from "react";

import style from "./style.module.scss";
import Title from "@/ui/title";
import Layout from "@/components/layout";

const GamePage: FC = () => {
  return (
    <Layout.Page>
      <Title.H2 title={"Страница игры"} />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,
        architecto consectetur culpa dicta dignissimos dolorem eius eos fugiat
        harum libero natus numquam quae, sapiente tempora, ut vel velit vitae
        voluptates.
      </p>
    </Layout.Page>
  );
};

export default GamePage;
