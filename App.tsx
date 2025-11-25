/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import RootNavigator from './src/navigation/RootNavigation';
import { Provider,useDispatch, useSelector } from 'react-redux';
import { AppDispatch, store } from './src/redux/store';
import { autoLogin } from './src/redux/actions/authActions';

const Root = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(autoLogin());
  }, []);

  return <RootNavigator />;
};
export default function App() {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}
