import style from "./style.module.scss";

const userDummy = {
  avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
};

type TProps = {
  onClick: (event: React.MouseEvent) => void;
};

const AvatarImg = ({ onClick }: TProps) => {
  return (
    <div className={style.wrapper} onClick={onClick}>
      <img className={style.img} src={userDummy.avatar} alt="User avatar" />
    </div>
  );
};

export default AvatarImg;
