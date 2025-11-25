import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsProvider } from '../context/SettingsContext';
// import { AuthContext } from '../context/AuthContext';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export default function RootNavigator() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // optional splash
  }, []);

  if (loading) return null;
  return (
    <SettingsProvider>
    
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          {user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
      
    </SettingsProvider>
  );
}
