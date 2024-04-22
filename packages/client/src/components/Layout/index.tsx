import { FC, ReactNode } from "react";

import style from "./style.module.scss";

export type TProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

const Main: FC<TProps> = ({ children }) => {
  return <main className={style.main}>{children}</main>;
};

const Container: FC<TProps> = ({ children, className }) => {
  return (
    <div className={`${style.container} ${className ? className : ""}`}>
      {children}
    </div>
  );
};

const Page: FC<TProps> = ({ children, className }) => {
  return (
    <div className={`${style.page} ${className ? className : ""}`}>
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
