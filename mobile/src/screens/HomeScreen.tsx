import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types/navigation.types';
import { useAuth } from '../context/AuthContext';
import Colors from '../constants/colors';
import CustomButton from '../components/CustomButton';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Avatar placeholder */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.username.charAt(0).toUpperCase()}
          </Text>
        </View>

        {/* Welcome message */}
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.username}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* User info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue}>{user?.id}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status</Text>
            <Text style={[styles.infoValue, styles.activeStatus]}>Active</Text>
          </View>
        </View>

        {/* Logout button */}
        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />
      </View>

      {/* Placeholder for future features */}
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresTitle}>Coming Soon</Text>
        <Text style={styles.featuresText}>
          - Social Engineering Lessons{'\n'}
          - Phishing Simulations{'\n'}
          - Security Quizzes{'\n'}
          - Progress Tracking
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.white,
  },
  welcomeText: {
    fontSize: 18,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  activeStatus: {
    color: Colors.success,
  },
  logoutButton: {
    width: '100%',
  },
  featuresContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: Colors.card,
    borderRadius: 12,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 15,
  },
  featuresText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 28,
  },
});