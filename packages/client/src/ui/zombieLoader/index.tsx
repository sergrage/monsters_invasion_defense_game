import style from "./style.module.scss";

const ZombieLoader = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.img}></div>
      <span className={style.text}>loading...</span>
    </div>
  );
};

export default ZombieLoader;
