import {
  USER_REQUEST_LOGIN,
  USER_SUCCESS_LOGIN,
  USER_FAILURE_LOGIN,
  AUTO_LOGIN,
  LOGOUT,
  AuthActionTypes,
  User,
} from '../types/authActionTypes';

interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = { loading: false, user: null, error: null };

export const authReducer = (
  state = initialState, 
  action: AuthActionTypes,
): AuthState => {
  switch (action.type) {
    case USER_REQUEST_LOGIN:
      return { ...state, loading: true, error: null };
    case USER_SUCCESS_LOGIN:
      return { ...state, loading: false, user: action.payload };
    case USER_FAILURE_LOGIN:
      return { ...state, loading: false, error: action.payload };
    case AUTO_LOGIN:
      return { ...state, user: action.payload };  
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};
