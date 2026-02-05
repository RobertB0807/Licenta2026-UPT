import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import authService from '../services/authService';
import { AuthStackParamList } from '../types/navigation.types';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors';
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validatePasswordConfirmation,
  PasswordStrength
} from '../utils/validation';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // State-uri pentru validare
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength | undefined>();

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

  // Validare username în timp real
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (text) {
      const validation = validateUsername(text);
      setUsernameError(validation.isValid ? '' : validation.message || '');
    } else {
      setUsernameError('');
    }
  };

  // Validare parolă în timp real
  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (text) {
      const validation = validatePassword(text);
      setPasswordError(validation.isValid ? '' : validation.message || '');
      setPasswordStrength(validation.strength);
    } else {
      setPasswordError('');
      setPasswordStrength(undefined);
    }

    // Re-validează confirm password dacă există
    if (confirmPassword) {
      const confirmValidation = validatePasswordConfirmation(text, confirmPassword);
      setConfirmPasswordError(confirmValidation.isValid ? '' : confirmValidation.message || '');
    }
  };

  // Validare confirm password în timp real
  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    if (text) {
      const validation = validatePasswordConfirmation(password, text);
      setConfirmPasswordError(validation.isValid ? '' : validation.message || '');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = async () => {
    // Validare finală înainte de submit
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (usernameError || emailError || passwordError || confirmPasswordError) {
      Alert.alert('Error', 'Please fix all errors before submitting');
      return;
    }

    console.log('=== REGISTER ATTEMPT ===');
    console.log('Username:', username);
    console.log('Email:', email);

    setLoading(true);
    try {
      console.log('Calling authService.register...');
      const response = await authService.register({ username, email, password });
      console.log('Register SUCCESS:', response);

      // Resetează formularul
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPasswordStrength(undefined);

      // Afișează mesaj de succes
      Alert.alert(
        'Success',
        'Account created successfully! Redirecting to login...',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      );

      // Navigare automată după 2 secunde (fallback pentru web)
      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000);

    } catch (error: any) {
      console.log('=== REGISTER ERROR ===');
      console.log('Error:', error);
      console.log('Error message:', error.message);
      console.log('Error response:', error.response?.data);

      let errorMessage = 'Registration failed';

      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;

        // Verifică pentru email duplicat (mai multe variante)
        const lowerMessage = errorMessage.toLowerCase();
        if (lowerMessage.includes('email')) {
          setEmailError(errorMessage);
          errorMessage = 'Please check the errors above';
        }

        // Verifică pentru username duplicat
        if (lowerMessage.includes('username')) {
          setUsernameError(errorMessage);
          errorMessage = 'Please check the errors above';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>

        <CustomInput
          label="Username"
          placeholder="Enter your username"
          value={username}
          onChangeText={handleUsernameChange}
          error={usernameError}
          isValid={username.length > 0 && !usernameError}
          autoCapitalize="none"
        />
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
          onChangeText={handlePasswordChange}
          error={passwordError}
          isValid={password.length > 0 && !passwordError}
          isPassword
        />
        {passwordStrength && (
          <Text style={[
            styles.strengthText,
            passwordStrength === PasswordStrength.WEAK && { color: Colors.error },
            passwordStrength === PasswordStrength.MEDIUM && { color: Colors.warning },
            passwordStrength === PasswordStrength.STRONG && { color: Colors.success },
          ]}>
            Password strength: {passwordStrength.toUpperCase()}
          </Text>
        )}
        <CustomInput
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
          error={confirmPasswordError}
          isValid={confirmPassword.length > 0 && !confirmPasswordError}
          isPassword
        />
        <CustomButton
          title="Register"
          onPress={handleRegister}
          loading={loading}
        />
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? Login
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  strengthText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.primary,
    fontSize: 16,
  },
});