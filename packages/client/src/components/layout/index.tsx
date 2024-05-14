import { FC, ReactNode } from "react";
import cn from "classnames";

import style from "./style.module.scss";

export type TProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  id?: string;
  fullScreen?: () => void;
  pageClass?: string;
};

const Main: FC<TProps> = ({ children }) => {
  return <main className={style.main}>{children}</main>;
};

const Container: FC<TProps> = ({ children, className = "" }) => {
  return <div className={cn(style.container, className)}>{children}</div>;
};

const Page: FC<TProps> = ({ children, pageClass, className }) => {
  return (
    <div className={cn(style.page, pageClass)}>
      <Container className={className}>{children}</Container>
    </div>
  );
};

const Backdrop: FC<TProps> = ({ children, className }) => {
  return (
    <section className={cn(style.backdrop, className)}>{children}</section>
  );
};

const Layout = {
  Main: Main,
  Container: Container,
  Page: Page,
  Backdrop: Backdrop,
};

export default Layout;
