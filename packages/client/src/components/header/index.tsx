import React, { FC, ReactNode } from "react";

import style from "./style.module.scss";
import Layout from "@/components/Layout";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const Header: FC<TProps> = ({ children }) => {
  return (
    <div className={style.header}>
      <Layout.Container>{children}</Layout.Container>
    </div>
  );
};

export default Header;
