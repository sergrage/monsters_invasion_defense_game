import React, { FC, ReactNode } from "react";

import style from "./style.module.scss";
import Header from "@/components/header";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const Main: FC<TProps> = ({ children }) => {
  return (
    <>
      {/* Предлагаю вручную создать хедер */}
      {/* <Header>Some Header</Header> */}{" "}
      <main className={style.main}>{children}</main>
    </>
  );
};

const Container: FC<TProps> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

const Page: FC<TProps> = ({ children }) => {
  return (
    <div className={style.page}>
      <Container>{children}</Container>
    </div>
  );
};

const Layout = {
  Main: Main,
  Container: Container,
  Page: Page,
};

export default Layout;
