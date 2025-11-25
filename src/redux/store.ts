import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({ auth: authReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;