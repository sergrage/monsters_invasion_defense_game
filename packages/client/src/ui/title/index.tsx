import { FC, HTMLAttributes, ReactNode } from "react";
import cn from "classnames";

import style from "./style.module.scss";

export type TProps = {
  title?: string;
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;

const H1: FC<TProps> = ({ title, className, children, ...rest }) => {
  return (
    <h1 className={cn(style.title, style.h1, className)} {...rest}>
      {title ?? children}
    </h1>
  );
};

const H2: FC<TProps> = ({ title, className, children, ...rest }) => {
  return (
    <h2 className={cn(style.title, style.h2, className)} {...rest}>
      {title ?? children}
    </h2>
  );
};

const Title = {
  H1: H1,
  H2: H2,
};
export default Title;
