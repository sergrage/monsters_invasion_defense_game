import { useEffect, useState } from "react";
import cn from "classnames";

import style from "./style.module.scss";
import zombies from "../../assets/img/errorZombies/index";

type TProps = {
  text?: string;
};

function randomizeZombies() {
  return zombies[Math.round(Math.random() * (zombies.length - 1))];
}

const ZombieError = ({ text }: TProps) => {
  // получить рандомное изображение до рендера компонента
  // в противном случае появляется один и тот же зомби
  const [zombie] = useState(() => randomizeZombies());
  const [isMoving, setIsMoving] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isTexting, setIsTexting] = useState(false);

  // показывает текст ошибки и анимирует зомби через заданное время
  useEffect(() => {
    let shakeTimer: ReturnType<typeof setTimeout>;
    let textTimer: ReturnType<typeof setTimeout>;

    setTimeout(() => {
      // выезжает зомби
      setIsMoving(true);

      shakeTimer = setTimeout(() => {
        // зомби трясет
        setIsShaking(true);

        textTimer = setTimeout(() => {
          // появляется текст
          setIsTexting(true);
        }, 100);
      }, 500);
    }, 0);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div
      className={cn(style.error, {
        [style.move]: isMoving,
      })}
    >
      <img
        className={cn(style.img, {
          [style.shake]: isShaking,
        })}
        src={zombie}
        alt="Zombie image"
      />

      <div
        className={cn(style["text-wrapper"], {
          [style.show]: isTexting,
        })}
      >
        {text ? (
          <p>{text}</p>
        ) : (
          <p className={style["error-el__text"]}>
            Err...
            <br />
            Wrrooonggg...
            <br />
            inpuuut...
            <br />
            vaaallluuee...
          </p>
        )}
      </div>
    </div>
  );
};

export default ZombieError;
