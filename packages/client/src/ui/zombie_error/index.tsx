import { useEffect, useRef, useState } from "react";

import style from "./style.module.scss";
import zombies from "../../assets/images/error-zombies/index";

type zombieProps = {
  text?: string;
};

function randomizeZombies() {
  return zombies[Math.floor(Math.random() * 4)];
}

const ZombieError = ({ text }: zombieProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // получить рандомное изображение до рендера компонента
  // в противном случае появляется один и тот же зомби
  const [zombie] = useState(() => randomizeZombies());

  // показывает текст ошибки и анимирует зомби через заданное время
  useEffect(() => {
    let shakeTimer: ReturnType<typeof setTimeout>;
    let textTimer: ReturnType<typeof setTimeout>;

    const moveTimer = setTimeout(() => {
      // выезжает зомби
      containerRef.current?.classList.add(style["move"]);

      shakeTimer = setTimeout(() => {
        // зомби трясет
        imageRef.current?.classList.add(style["shake"]);

        textTimer = setTimeout(() => {
          // появляется текст
          textRef.current?.classList.add(style["show"]);
        }, 150);
      }, 500);
    }, 0);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(shakeTimer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className={style["error-el"]}>
      <img
        ref={imageRef}
        className={style["error-el__img"]}
        src={zombie}
        alt="Zombie image"
      />

      <div ref={textRef} className={style["error-el__text-wrapper"]}>
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
