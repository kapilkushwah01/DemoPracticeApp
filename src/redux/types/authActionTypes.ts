export const USER_REQUEST_LOGIN = 'USER_REQUEST_LOGIN';
export const USER_SUCCESS_LOGIN = 'USER_SUCCESS_LOGIN';
export const USER_FAILURE_LOGIN = 'USER_FAILURE_LOGIN';
export const LOGOUT = 'LOGOUT';

export interface User {
  email: string;
  token: string;
}

interface UserRequestLoginAction {
  type: typeof USER_REQUEST_LOGIN;
}
interface UserSuccessLoginAction {
  type: typeof USER_SUCCESS_LOGIN;
  payload: User;
}
interface UserFailureLoginAction {
  type: typeof USER_FAILURE_LOGIN;
  payload: string;
}
interface LogoutAction {
  type: typeof LOGOUT;
}

export type AuthActionTypes =
  | UserRequestLoginAction
  | UserSuccessLoginAction
  | UserFailureLoginAction
  | LogoutAction;
