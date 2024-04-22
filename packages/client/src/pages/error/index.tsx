import React, { FC } from "react";

import style from "./style.module.scss";
import Layout from "@/components/layout";
import Image from "@/ui/image";
import Title from "@/ui/title";
import error404 from "@/assets/img/error404.png";
import error500 from "@/assets/img/error500.png";

const Page404: FC = () => {
  return (
    <Layout.Page className={style.wrapper}>
      <Title.H1 title={"This page not found!"} className={style.title} />

      <Image src={error404} className={style.image} />
    </Layout.Page>
  );
};

const Page500: FC = () => {
  return (
    <Layout.Page className={style.wrapper}>
      <Title.H1
        title={"Sorry, we have some problems now..."}
        className={style.title}
      />

      <Image src={error500} className={style.image} />
    </Layout.Page>
  );
};

const ErrorPage = {
  error404: Page404,
  error500: Page500,
};
export default ErrorPage;
