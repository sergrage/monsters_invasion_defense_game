type userType = {
  id: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  email: string;
  avatar: string;
};

export type UserState = {
  user: null | userType;
  isLoading: boolean;
  isAuth: boolean;
};
