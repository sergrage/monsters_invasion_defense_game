import React, { FC, ReactNode } from "react";

import style from "./style.module.scss";
import Header from "@/components/header";
import cn from "classnames";

export type TProps = {
  children: ReactNode;
  className?: string;
};

const Main: FC<TProps> = ({ children }) => {
  return <main className={style.main}>{children}</main>;
};

const Container: FC<TProps> = ({ children, className }) => {
  return <div className={cn(style.container, className)}>{children}</div>;
};

const Page: FC<TProps> = ({ children, className }) => {
  return (
    <div className={style.page}>
      <Container className={className}>{children}</Container>
    </div>
  );
};

const Layout = {
  Main: Main,
  Container: Container,
  Page: Page,
};

export default Layout;
