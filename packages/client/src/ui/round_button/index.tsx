import cn from "classnames";
import style from "./style.module.scss";

type buttonType = {
  name: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  red?: boolean;
  yellow?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const RoundButton = ({
  name,
  type = "button",
  disabled,
  red,
  yellow,
  onClick,
}: buttonType) => {
  return (
    <div className={style["button-el"]}>
      <button
        className={cn(style["button-el__btn"], {
          [style["button-el__btn--red"]]: red,
          [style["button-el__btn--yellow"]]: yellow,
        })}
        name={name}
        type={type}
        disabled={disabled}
        onClick={onClick}
      ></button>

      <div className={style["button-el__back"]}></div>
      <div className={style["button-el__back2"]}></div>
    </div>
  );
};

export default RoundButton;
