import style from "./style.module.scss";

type buttonType = {
  name: string;
  type?: "submit" | "reset";
  disabled?: boolean;
  transparent?: boolean;
  dangerous?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

function FlatButton(props: buttonType) {
  return (
    <button
      className={`${style["button"]} ${props.transparent ? style["button--transparent"] : props.dangerous ? style["button--dangerous"] : ""}`}
      name={props.name}
      type={props.type ? props.type : "button"}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}

export default FlatButton;
