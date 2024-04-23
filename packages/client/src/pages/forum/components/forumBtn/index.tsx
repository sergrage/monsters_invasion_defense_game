import React, { FC, ReactNode } from "react";

import style from "./style.module.scss";
import Layout from "@/components/Layout";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const ForumBtn: FC<TProps> = ({ children }) => {
  return (
    <div className={style.header} id="header">
      <Layout.Container>{children}</Layout.Container>
    </div>
  );
};

export default ForumBtn;
