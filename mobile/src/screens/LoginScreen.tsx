import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import authService from '../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
        Alert.alert('Success', `Welcome ${response.user.username}!`);
    } catch (error: any) {
        console.log('=== LOGIN ERROR ===');
        console.log('Error:', error);
        console.log('Error message:', error.message);
        console.log('Error response:', error.response?.data);
        
        Alert.alert('Error', error.response?.data?.detail || error.message || 'Login failed');
    } finally {
        setLoading(false);
    }
    };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Social Engineering Education</Text>
      <Text style={styles.subtitle}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#007AFF',
    fontSize: 16,
  },
});