import style from "./style.module.scss";

type buttonType = {
  name: string;
  type?: "submit" | "reset";
  disabled?: boolean;
  red?: boolean;
  yellow?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

function RoundButton(props: buttonType) {
  return (
    <div className={style["button-el"]}>
      <button
        className={`${style["button-el__btn"]} ${props.red ? style["button-el__btn--red"] : props.yellow ? style["button-el__btn--yellow"] : ""}`}
        name={props.name}
        type={props.type ? props.type : "button"}
        disabled={props.disabled}
        onClick={props.onClick}
      ></button>

      <div className={style["button-el__back"]}></div>
      <div className={style["button-el__back2"]}></div>
    </div>
  );
}

export default RoundButton;
