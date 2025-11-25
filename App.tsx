/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import RootNavigator from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
