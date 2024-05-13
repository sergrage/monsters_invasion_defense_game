import { useEffect, useState } from "react";
import cn from "classnames";

import { SCREEN_ZOMBIE_MESSAGE_FINAL } from "@/constants/index";
import style from "./style.module.scss";

type TProps = {
  text: string;
};

const ScreenZombie = ({ text }: TProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isTexting, setIsTexting] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [hideZombie, sethideZombie] = useState(false);

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

  useEffect(() => {
    if (text !== SCREEN_ZOMBIE_MESSAGE_FINAL) {
      return;
    }
    setTimeout(() => {
      setShowExplosion(true);

      setTimeout(() => {
        sethideZombie(true);
      }, 400);
    }, 400);
  }, [text]);

  return (
    <div
      className={cn(style.wrapper, {
        [style.move]: isMoving,
        [style.shake]: isShaking,
      })}
    >
      {!hideZombie && <div className={style.img}></div>}
      {showExplosion && <div className={style.explosion}></div>}

      <div
        className={cn(style["text-wrapper"], {
          [style.show]: isTexting,
        })}
      >
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ScreenZombie;
