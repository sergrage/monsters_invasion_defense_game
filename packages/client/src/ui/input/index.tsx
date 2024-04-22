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

const Input = ({
  name,
  label,
  placeholder,
  type = "text",
  required,
  onChange,
  onBlur,
  onError,
}: inputType) => {
  const id = useId();
  const conatinerRef = useRef<HTMLDivElement | null>(null);

  const [error, setError] = useState(false);

  // проверяет пустое ли поле, или отрицательное число в инпуте
  const checkValue = (value: string | number) => {
    if (
      (required && type !== "number" && !(value as string).trim()) ||
      (type === "number" && (value as number) < 1)
    ) {
      return false;
    }

    return true;
  };

  // если ошибка переключаем класс error
  useEffect(() => {
    if (!required || conatinerRef.current === null) return;

    conatinerRef.current.classList.toggle(style.error, error);
    if (onError) onError(error);
  }, [error]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);

    if (!required) return;

    setError(false);
  };

  // проверяет инпуты после потери фокуса
  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);
    if (!required) return;

    if (!checkValue(event.target.value)) setError(true);
  };

  return (
    <div ref={conatinerRef} className={style["input-el"]}>
      <label className={style["input-el__label"]} htmlFor={`input-${id}`}>
        {label}
      </label>

      <input
        className={style["input-el__input"]}
        id={`input-${id}`}
        name={name}
        placeholder={placeholder}
        type={type}
        onChange={changeHandler}
        onBlur={blurHandler}
      ></input>

      {error && <ZombieError />}
    </div>
  );
};

export default Input;
