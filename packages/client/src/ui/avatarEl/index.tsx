import style from "./style.module.scss";

const userDummy = {
  avatar: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
};

type TProps = {
  onClick: (event: React.MouseEvent) => void;
};

const AvatarEl = ({ onClick }: TProps) => {
  return (
    <div className={style.avatar} onClick={onClick}>
      <div className={style.wrapper}>
        <img className={style.img} src={userDummy.avatar} alt="User avatar" />
        <div className={style.back}>
          <p>Change avatar</p>
        </div>
      </div>
    </div>
  );
};

export default AvatarEl;
