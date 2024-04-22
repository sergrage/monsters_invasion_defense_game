import { useEffect, useId, useRef, useState } from "react";
import cn from "classnames";

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

  const [isInvalid, setIsInvalid] = useState(false);

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

  useEffect(() => {
    if (!required) return;
    if (onError) onError(isInvalid);
  }, [isInvalid]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);

    if (!required) return;
    setIsInvalid(false);
  };

  // проверяет инпуты после потери фокуса
  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(event);

    if (!required) return;
    if (!checkValue(event.target.value)) setIsInvalid(true);
  };

  return (
    <div
      ref={conatinerRef}
      className={cn(style["input-el"], { [style.error]: isInvalid })}
    >
      <label className={style["input-el__label"]} htmlFor={`input-${id}`}>
        {label}
      </label>

      <input
        className={style["input-el__input"]}
        id={`input-${id}`}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
      ></input>

      {isInvalid && <ZombieError />}
    </div>
  );
};

export default Input;
