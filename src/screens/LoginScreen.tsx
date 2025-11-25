import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { RootState } from '../redux/store';
import { AuthStackParamList } from '../navigation/AuthStack';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<AuthStackParamList, 'LogIn'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const contentFade = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const logoTranslate = useRef(new Animated.Value(-20)).current;

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const { loading, user, error } = useSelector((state: RootState) => state.auth);
  console.log("lllllooooooo",loading, user, error)
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslate, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Navigate to AppStack if logged in
  useEffect(() => {
    if (user) {
      navigation.replace('AppStack'); // Make sure AppStack exists in your navigator
    }
  }, [user, navigation]);

  // Show error alert
  useEffect(() => {
    if (error) {
      Alert.alert('Login Error', error);
    }
  }, [error]);

  // Login button handler
  const handleLogin = () => {
    if (!email.includes('@')) {
      Alert.alert('Invalid Email', 'Please enter a valid email');
      return;
    }
    if (!password) {
      Alert.alert('Missing Password', 'Please enter your password');
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <LinearGradient colors={['#4CA6FF', '#2D2B7A']} style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Animated.View
          style={[
            styles.logoArea,
            { transform: [{ translateY: logoTranslate }, { scale: logoScale }] },
          ]}
        >
          <Image
            source={require('../assets/Logo.png')} // Make sure this exists
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>

        <Animated.View style={[styles.card, { opacity: contentFade }]}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Please log in to continue
          </Text>

          {/* Email Input */}
          <View style={styles.inputWrap}>
            <Icon name="email-outline" size={20} style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#E8E8E8"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrap}>
            <Icon name="lock-outline" size={20} style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#E8E8E8"
              secureTextEntry={!showPassword}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={{ padding: 8 }}>
              <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.btnFacebook} activeOpacity={0.85}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnTextWhite}>Log In</Text>}
          </TouchableOpacity>

          {/* Sign Up Footer */}
          <Text style={styles.footer}>
            Don't have an account?{' '}
            <Text style={styles.signIn}>
              Sign Up
            </Text>
          </Text>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1, alignItems: 'center' },
  logoArea: { width: '100%', alignItems: 'center', marginTop: 40 },
  logo: { width: Math.min(220, width * 0.6), height: Math.min(220, width * 0.6) },
  card: { width: '86%', backgroundColor: 'transparent', marginTop: 20, alignItems: 'center', paddingBottom: 40 },
  title: { color: '#fff', fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 6 },
  subtitle: { color: '#E6ECFF', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  btnFacebook: { marginTop: 26, width: '100%', paddingVertical: 12, borderRadius: 28, backgroundColor: '#1877F2', alignItems: 'center' },
  btnTextWhite: { color: '#fff', fontWeight: '700' },
  footer: { marginTop: 18, color: '#DDEAFE' },
  signIn: { color: '#fff', fontWeight: '700' },
  inputWrap: { width: width * 0.85, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 25, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  icon: { color: '#fff', marginRight: 8 },
  input: { flex: 1, height: 50, color: '#fff', fontSize: 15 },
});
