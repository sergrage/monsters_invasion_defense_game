import cn from "classnames";
import style from "./style.module.scss";

type TProps = {
  name: string;
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  icon: string;
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
};

const IconButton = ({
  name,
  type = "button",
  icon,
  disabled,
  className,
  onClick,
}: TProps) => {
  return (
    <button
      className={cn(style.button, className)}
      title={`${name} button`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <img className={style.icon} src={icon} alt={name}></img>
    </button>
  );
};

export default IconButton;
