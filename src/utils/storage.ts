import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSetting = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('Saving error', e);
  }
};

export const getSetting = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    return null;
  }
};
