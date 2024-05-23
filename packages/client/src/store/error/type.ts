export type TError = Record<string, string[]>;

export interface IError {
  error: TError | string;
  status: number;
}

export type TNotify = "success" | "warning" | "error";

export interface INotify {
  id: string;
  message: string;
  status: TNotify;
}

export type ErrorState = {
  hasError: boolean;
  globalError: IError | undefined;
  notifyError: INotify[] | undefined;
};
