import cn from "classnames";
import style from "./style.module.scss";

type buttonType = {
  name: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  transparent?: boolean;
  dangerous?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const FlatButton = ({
  name,
  type = "button",
  disabled,
  transparent,
  dangerous,
  onClick,
}: buttonType) => {
  return (
    <button
      className={cn(style.button, {
        [style.transparent]: transparent,
        [style.dangerous]: dangerous,
      })}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default FlatButton;
