import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Dimensions,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigation';
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;
const { height } = Dimensions.get('window');

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -height * 0.22,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 1,
          duration: 650,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      navigation.replace('LogIn');
    });
  }, [scale, translateY, fade, navigation]);
  return (
     <LinearGradient colors={['#4CA6FF', '#2D2B7A']} style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrap,
          {
            transform: [
              { scale: scale.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1.0] }) },
              { translateY },
            ],
          },
        ]}
      >
        <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
      </Animated.View>

      <Animated.View style={[styles.dots, { opacity: fade }]} />
    </LinearGradient>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logo: {
    width: 180,
    height: 180,
  },
  dots: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});