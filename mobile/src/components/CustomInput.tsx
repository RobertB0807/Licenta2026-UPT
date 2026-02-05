import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import Colors from '../constants/colors';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  isValid?: boolean;
  isPassword?: boolean;
}

export default function CustomInput({
  label,
  error,
  isValid,
  isPassword = false,
  ...props
}: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const getBorderColor = () => {
    if (error) return Colors.inputBorderError;
    if (isValid) return Colors.inputBorderSuccess;
    return Colors.inputBorder;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={[
            styles.input,
            { borderColor: getBorderColor() },
            props.style,
          ]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor={Colors.textLight}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeText}>
              {showPassword ? '🙈' : '👁️'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: Colors.inputBackground,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 2,
    color: Colors.text,
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  eyeText: {
    fontSize: 20,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
});