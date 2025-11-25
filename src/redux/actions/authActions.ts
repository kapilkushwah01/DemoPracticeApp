import { Dispatch } from 'redux';
import {
  USER_REQUEST_LOGIN,
  USER_SUCCESS_LOGIN,
  USER_FAILURE_LOGIN,
  AuthActionTypes,
  User,
} from '../types/authActionTypes';

// Fake API login
const fakeLoginApi = (email: string, password: string): Promise<User> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === '123456') {
        resolve({ email, token: 'fake-token' });
      } else {
        reject('Invalid credentials');
      }
    }, 1500);
  });

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({ type: USER_REQUEST_LOGIN });
    try {
      const user = await fakeLoginApi(email, password);
      dispatch({ type: USER_SUCCESS_LOGIN, payload: user });
    } catch (error) {
      dispatch({ type: USER_FAILURE_LOGIN, payload: error as string });
    }
  };
};
