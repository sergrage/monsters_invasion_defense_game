import { FC } from "react";
import cn from "classnames";

import style from "./style.module.scss";

export type TProps = {
  title: string;
  className?: string;
};

const H1: FC<TProps> = ({ title, className }) => {
  return <h1 className={cn(style.title, className)}>{title}</h1>;
};

const H2: FC<TProps> = ({ title, className }) => {
  return <h2 className={cn(style.title, className)}>{title}</h2>;
};

const Title = {
  H1: H1,
  H2: H2,
};
export default Title;
