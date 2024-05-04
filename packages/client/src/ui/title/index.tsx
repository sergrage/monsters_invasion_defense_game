import { FC, ReactNode } from "react";
import cn from "classnames";

import style from "./style.module.scss";

export type TProps = {
  title: string | ReactNode;
  className?: string;
  extraClass?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  state?: boolean;
};
const H1: FC<TProps> = ({ title, className }) => {
  return <h1 className={cn(style.title, style.h1, className)}>{title}</h1>;
};

const H2: FC<TProps> = ({ title, className, ...props }) => {
  return (
    <h2
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
      className={cn(className, style.title, style.h2, {
        [`${props.extraClass}`]: props.state,
      })}
    >
      {title}
    </h2>
  );
};

const Title = {
  H1: H1,
  H2: H2,
};
export default Title;
