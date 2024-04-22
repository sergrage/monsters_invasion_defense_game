import React, { FC, ReactNode } from "react";

import style from "./style.module.scss";
import ContentLoader from "react-content-loader";
import cn from "classnames";

export type TProps = {
  className?: string;
};
const Main: FC<TProps> = ({ className }) => {
  return (
    <div className={cn(style.contentWrapper, className)}>
      <div className={style.lds} />
    </div>
  );
};

const Content: FC<TProps> = ({ className }) => {
  return (
    <div className={cn(style.contentWrapper, className)}>
      <ContentLoader
        speed={2}
        width={"100%"}
        backgroundColor="#e1e1e1"
        foregroundColor="#ecebeb"
        className={style.contentLoader}
      >
        <rect x="0" y="0" rx="3" ry="3" width="100%" height="100%" />
      </ContentLoader>
    </div>
  );
};

const Loader = {
  Content,
  Main,
};

export default Loader;
