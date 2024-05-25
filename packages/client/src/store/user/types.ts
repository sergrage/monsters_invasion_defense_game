export type TUser = {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  email: string;
  avatar: string;
};

export type TUserState = {
  user: null | TUser;
  isLoading: boolean;
  isAuth: boolean;
};

export type TLogIn = {
  login: string;
  password: string;
};

export type TSignUp = {
  login: string;
  password: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
};

export type TPassword = {
  oldPassword: string;
  newPassword: string;
};

export type TResponse = {
  [key: string]: string;
};
