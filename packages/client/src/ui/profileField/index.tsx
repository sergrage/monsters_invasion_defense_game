import style from "./style.module.scss";

type TProps = {
  value: string;
  label?: string;
};

const ProfileField = ({ value, label }: TProps) => {
  return (
    <div className={style.wrapper}>
      <p className={style.label}>{label}</p>
      <p className={style.field}>{value}</p>
    </div>
  );
};

export default ProfileField;
