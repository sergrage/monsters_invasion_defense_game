export type TError = Record<string, string[]>;

export interface IError {
  errors: TError;
  status: number;
}

export type TNotify = "success" | "warning" | "error";
export interface INotify {
  message: string;
  status: TNotify;
}

export type ErrorState = {
  hasError: boolean;
  globalError: IError | undefined;
  notifyError: INotify[] | undefined;
};
