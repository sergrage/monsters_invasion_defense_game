import { useEffect, useId, useRef, useState } from "react";

import ZombieError from "../zombie_error";
import style from "./style.module.scss";

type inputType = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onError?: (val: boolean) => void;
};

const Input = (props: inputType) => {
  const id = useId();
  const conatinerRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState(false);

  // проверяет пустое ли поле, или отрицательное число в инпуте
  const checkValue = (value: string | number) => {
    if (
      (props.required &&
        props.type !== "number" &&
        !(value as string).trim()) ||
      (props.type === "number" && (value as number) < 1)
    ) {
      return false;
    }

    return true;
  };

  // если ошибка переключаем класс error
  useEffect(() => {
    if (!props.required || conatinerRef.current === null) return;

    conatinerRef.current.classList.toggle(style.error, error);
    if (props.onError) props.onError(error);
  }, [error]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event);

    if (!props.required) return;

    setError(false);
  };

  // проверяет инпуты после потери фокуса
  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    props.onBlur?.(event);
    if (!props.required) return;

    if (!checkValue(event.target.value)) setError(true);
  };

  return (
    <div ref={conatinerRef} className={style["input-el"]}>
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

      {error && <ZombieError />}
    </div>
  );
};

export default Input;
