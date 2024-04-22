import { useEffect, useId, useRef, useState } from "react";
import style from "./style.module.scss";
import ExoticError from "../zombie_error";

type inputType = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent) => void;
  onError?: (val: boolean) => void;
};

let timer: ReturnType<typeof setTimeout>;

function Input(props: inputType) {
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState(false);

  // проверяет есть ли пустые поля, или неверные значения в инпуте
  function checkValue(value: string | number) {
    if (
      (props.required &&
        props.type !== "number" &&
        !(value as string).trim()) ||
      (props.type === "number" && (value as number) < 1)
    ) {
      return false;
    }

    return true;
  }

  // если ошибка переключаем класс error
  useEffect(() => {
    if (!props.required || ref.current === null) return;

    ref.current.classList.toggle(style.error, error);
    if (props.onError) props.onError(error);
  }, [error]);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    props.onChange(event);

    if (!props.required) return;

    setError(false);
  }

  // проверяет инпуты после потери фокуса
  function blurHandler(event: React.FocusEvent<HTMLInputElement>) {
    if (!props.required) return;

    if (!checkValue(event.target.value)) setError(true);
  }

  return (
    <div ref={ref} className={style["input-el"]}>
      <label className={style["input-el__label"]} htmlFor={`input-${id}`}>
        {props.label}
      </label>

      <input
        className={style["input-el__input"]}
        id={`input-${id}`}
        name={props.name}
        placeholder={props.placeholder}
        type={`${props.type ? props.type : "text"}`}
        onChange={changeHandler}
        onBlur={blurHandler}
      ></input>

      {error && <ExoticError />}
    </div>
  );
}

export default Input;
