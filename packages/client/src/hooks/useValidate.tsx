import { ChangeEvent, useState } from "react";

interface IValues {
  [value: string]: string;
}

interface IErrors {
  [key: string]: boolean;
}

const regex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const validationRules = {
  email: (value: string) => !!value.trim() && regex.test(value),
  login: (value: string) => !!value.trim(),
  firstName: (value: string) => !!value.trim(),
  password: (value: string) => !!value.trim(),
  confirmPassword: (value: string) => !!value.trim(),
};

export function useValidate(inputValues: IValues = {}) {
  const [values, setValues] = useState<IValues>(inputValues);
  //console.log("🚀 ~ useValidate ~ values:", values);
  const [errors, setErrors] = useState<IErrors>({});
  //console.log("🚀 ~ useValidate ~ errors:", errors);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
    if (name in validationRules) {
      setErrors({
        ...errors,
        [name]: !validationRules[name as keyof typeof validationRules](value),
      });
    }
  };

  return { values, errors, handleChange };
}
