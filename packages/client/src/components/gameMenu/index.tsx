import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import style from "./style.module.scss";
import Image from "@/ui/image";

import menuItemBg from "@/assets/img/titleBox.png";

export type TProps = {
  menu: { title: string; route: string }[];
  control?: { route: string; action: any };
};

const GameMenu: FC<TProps> = ({ menu, control }) => {
  return (
    <div className={style.wrapper}>
      {menu.map((item, index) =>
        control && control.route === item.route.slice(1) ? (
          <NavLink
            className={style.menuItem}
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              // event.preventDefault();
              // window.audioGlobal.play("MenuClick");
              // if (control && control.route === item.route.slice(1)) {
              //   window.audioGlobal.play("MenuMusic", true);
              //   window.musicIsOn = true;
              //   control.action();
              // }
            }}
            to={item.route}
            key={index}
            data-route={item.route}
          >
            <Image className={style.menuItemBg} src={menuItemBg}></Image>
            <p className={style.menuItemText}>{item.title}</p>
          </NavLink>
        ) : (
          <NavLink
            className={style.menuItem}
            to={item.route}
            key={index}
            onClick={() => {
              // window.audioGlobal.play("MenuClick");
            }}
          >
            <Image className={style.menuItemBg} src={menuItemBg}></Image>
            <p className={style.menuItemText}>{item.title}</p>
          </NavLink>
        ),
      )}
    </div>
  );
};

export default GameMenu;
