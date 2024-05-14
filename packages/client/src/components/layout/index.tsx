import { FC, ReactNode } from "react";
import cn from "classnames";

import style from "./style.module.scss";

import { toggleFullscreen } from "@/utils/fullscreenMode";

export type TProps = {
  children: ReactNode | ReactNode[];
  className?: string;
  id?: string;
  fullScreen?: () => void;
};

const Main: FC<TProps> = ({ children }) => {
  return <main className={style.main}>{children}</main>;
};

const Container: FC<TProps> = ({ children, className = "" }) => {
  return <div className={cn(style.container, className)}>{children}</div>;
};

const Page: FC<TProps> = ({ children, className }) => {
  const fullScreen = () => {
    const wrapper = document.querySelector("#gameStartWrapper");
    if (wrapper) {
      toggleFullscreen(wrapper);
    }
  };

  return (
    <div className={style.page} id="gameStartWrapper">
      <Container className={className} fullScreen={fullScreen}>
        {children}
      </Container>
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
