import React, { FC } from "react";

import style from "./style.module.scss";

export type TProps = {
  title: string;
};
const H1: FC<TProps> = ({ title }) => {
  return <h1 className={style.title}>{title}</h1>;
};

const H2: FC<TProps> = ({ title }) => {
  return <h2 className={style.title}>{title}</h2>;
};

const Title = {
  H1: H1,
  H2: H2,
};
export default Title;
