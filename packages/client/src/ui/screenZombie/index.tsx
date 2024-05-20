import { useEffect, useState } from "react";
import cn from "classnames";

import { SCREEN_ZOMBIE_MESSAGE_FINAL } from "@/constants/index";
import style from "./style.module.scss";

type TProps = {
  text: string;
  action?: () => void;
};

let isInit = true;

const ScreenZombie = ({ text, action }: TProps) => {
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
    }, 10);

    return () => {
      clearTimeout(shakeTimer);
      clearTimeout(textTimer);
    };
  }, []);

  useEffect(() => {
    // skip first render
    if (isInit) {
      isInit = false;
      return;
    }

    let explosionTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    // if final message, show explosion
    if (text == SCREEN_ZOMBIE_MESSAGE_FINAL) {
      explosionTimer = setTimeout(() => {
        setShowExplosion(true);

        // hide zombie not to overlap with explosion
        hideTimer = setTimeout(() => {
          sethideZombie(true);
        }, 400);
      }, 400);

      return;
    }
    sethideZombie(false);

    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(hideTimer);
    };
  }, [text]);

  return (
    <div
      className={cn(style.wrapper, {
        [style.move]: isMoving,
        [style.shake]: isShaking,
      })}
      onClick={action}
    >
      {!hideZombie && <div className={style.img}></div>}
      {showExplosion && <div className={style.explosion}></div>}

      <div
        className={cn(style["text-wrapper"], {
          [style.show]: isTexting,
        })}
      >
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </div>
    </div>
  );
};

export default ScreenZombie;
