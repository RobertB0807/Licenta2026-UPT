import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import authService from '../services/authService';
import { AuthStackParamList } from '../types/navigation.types';
import { useAuth } from '../context/AuthContext';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import { validateEmail } from '../utils/validation';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  // State-uri pentru validare
  const [emailError, setEmailError] = useState('');

  // Validare email în timp real
  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (text) {
      const validation = validateEmail(text);
      setEmailError(validation.isValid ? '' : validation.message || '');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('=== LOGIN ATTEMPT ===');
    console.log('Email:', email);

    setLoading(true);
    try {
      console.log('Calling authService.login...');
      const response = await authService.login({ email, password });
      console.log('Login SUCCESS:', response);

      login({
        id: response.user.id,
        username: response.user.username,
        email: response.user.email,
      });

      navigation.navigate('Home');
    } catch (error: any) {
      console.log('=== LOGIN ERROR ===');
      console.log('Error:', error);
      console.log('Error message:', error.message);
      console.log('Error response:', error.response?.data);

      let errorMessage = 'Login failed';

      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <CustomInput
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        error={emailError}
        isValid={email.length > 0 && !emailError}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <CustomInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        isPassword
      />
      <CustomButton
        title="Login"
        onPress={handleLogin}
        loading={loading}
      />
      <Text
        style={styles.linkText}
        onPress={() => navigation.navigate('Register')}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: Colors.textSecondary,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.primary,
    fontSize: 16,
  },
});