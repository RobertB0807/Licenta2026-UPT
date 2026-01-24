import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth.types';


const API_URL = 'http://192.168.1.124:8000/api/auth';

const authService = {
  // Register user
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/register`, data);
    
    // Salvează token-ul local
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token.access_token);
    }

    return response.data;
  },
  
  // Login user
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, data);
    
    // Salvează token-ul local
    if (response.data.token) {
      await AsyncStorage.setItem('token', response.data.token.access_token);
    }

    return response.data;
  },

  // Logout user
  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
  },

  // Get saved token
  getToken: async (): Promise<string | null> => {
    return await AsyncStorage.getItem('token');
  },
};

export default authService;
