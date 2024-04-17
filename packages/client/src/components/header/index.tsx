import React, { FC, ReactNode } from "react";

import style from "./style.module.scss";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const Header: FC<TProps> = ({ children }) => {
  return <div className={style.header}>{children}</div>;
};

export default Header;
