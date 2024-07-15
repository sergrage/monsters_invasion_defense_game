import React, { FC, useEffect, useState } from "react";

import style from "./style.module.scss";
import cn from "classnames";

interface Props {
  type?: "checkbox" | "radio";
  name?: string;
  onChange?: (val: boolean) => void;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
}
export const Toggle: FC<Props> = ({
  type = "checkbox",
  name,
  onChange,
  className,
  checked,
  disabled,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <label className={cn(style.switch, className)}>
      <input
        type={type}
        name={name}
        checked={isChecked}
        disabled={disabled}
        onChange={e => {
          onChange?.(e.target.checked);
        }}
      />
      <span className={cn(style.slider, disabled && style.disabled)}></span>
    </label>
  );
};
