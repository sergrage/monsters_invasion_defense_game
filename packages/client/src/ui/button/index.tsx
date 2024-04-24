import cn from "classnames";
import style from "./style.module.scss";
import classNames from "classnames";

type TProps = {
  name: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  transparent?: boolean;
  dangerous?: boolean;
  deepRed?: boolean;
  formBtn?: boolean;
  formBtnRed?: boolean;
  formBtnBlue?: boolean;
  red?: boolean;
  yellow?: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const FlatButton = ({
  name,
  type = "button",
  disabled,
  transparent,
  dangerous,
  deepRed,
  formBtn,
  formBtnRed,
  formBtnBlue,
  className,
  onClick,
}: TProps) => {
  return (
    <button
      className={cn(style.button, className, {
        [style.transparent]: transparent,
        [style.dangerous]: dangerous,
        [style.deepRed]: deepRed,
        [style.formBtn]: formBtn,
        [style.formBtnRed]: formBtnRed,
        [style.formBtnBlue]: formBtnBlue,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

const RoundButton = ({
  name,
  type = "button",
  disabled,
  red,
  yellow,
  className,
  onClick,
}: TProps) => {
  return (
    <div
      className={cn(style["button-el"], className)}
      aria-label={`${name} button`}
      title={name}
    >
      <button
        className={cn(style["button-el__btn"], {
          [style["button-el__btn--red"]]: red,
          [style["button-el__btn--yellow"]]: yellow,
        })}
        type={type}
        disabled={disabled}
        onClick={onClick}
      ></button>

      <div className={style["button-el__back"]}></div>
      <div className={style["button-el__back2"]}></div>
    </div>
  );
};

const Button = {
  Flat: FlatButton,
  Round: RoundButton,
};

export default Button;
