import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../store';

import {
  USER_REQUEST_LOGIN,
  USER_SUCCESS_LOGIN,
  USER_FAILURE_LOGIN,
  AuthActionTypes,
  AUTO_LOGIN,
  LOGOUT,
} from '../types/authActionTypes';

// Define a type for Thunk result
type ThunkResult<R> = ThunkAction<R, RootState, undefined, AuthActionTypes>;

export const login = (email: string, password: string): ThunkResult<void> => {
  return async (dispatch) => {
    dispatch({ type: USER_REQUEST_LOGIN });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = {
        id: 1,
        email,
        token: 'dummy-token',
      };

      await AsyncStorage.setItem('user', JSON.stringify(user));

      dispatch({ type: USER_SUCCESS_LOGIN, payload: user });
    } catch (error) {
      dispatch({ type: USER_FAILURE_LOGIN, payload: String(error) });
    }
  };
};

export const autoLogin = (): ThunkResult<void> => {
  return async (dispatch) => {
    const user = await AsyncStorage.getItem('user');

    if (user) {
      dispatch({
        type: AUTO_LOGIN,
        payload: JSON.parse(user),
      });
    }
  };
};

export const logout = (): ThunkResult<void> => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('user');
    dispatch({ type: LOGOUT });
  };
};
