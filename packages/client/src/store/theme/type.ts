export type TTheme = "light" | "dark";
export interface ITheme {
  id: 1;
  theme_type: TTheme;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeState {
  data: ITheme;
  loading: boolean;
}
