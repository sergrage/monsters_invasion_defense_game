import { FC, ReactNode, useEffect } from "react";
import style from "./style.module.scss";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getThemeState } from "@/store/theme/reducer";
import { getThemeThunk } from "@/store/theme/actions";
import { getUserState } from "@/store/user/selector";
import cn from "classnames";

export type TProps = {
  children: ReactNode | ReactNode[];
};

const ThemeContainer: FC<TProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getThemeState);
  const user = useAppSelector(getUserState).user;

  useEffect(() => {
    user?.id && dispatch(getThemeThunk(user.id));
  }, [user]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  return (
    <div className={cn(style.theme, style[theme.data.theme_type])}>
      {children}
    </div>
  );
};

export default ThemeContainer;
