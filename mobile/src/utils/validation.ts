export interface ValidationResult {
  isValid: boolean;
  message?: string;
}
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, message: 'Email is required' };
  }
  
  // Regex pentru format email valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Invalid email format' };
  }
  
  return { isValid: true };
};

export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (username.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters' };
  }
  
  if (username.length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters' };
  }
  
  // Doar litere, cifre și underscore
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: 'Only letters, numbers, and underscores allowed' };
  }
  
  return { isValid: true };
};

export enum PasswordStrength {
  WEAK = 'weak',
  MEDIUM = 'medium',
  STRONG = 'strong',
}

export interface PasswordValidationResult extends ValidationResult {
  strength?: PasswordStrength;
}

export const validatePassword = (password: string): PasswordValidationResult => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { 
      isValid: false, 
      message: 'Password must be at least 8 characters',
      strength: PasswordStrength.WEAK 
    };
  }
  
  let strengthScore = 0;
  
  if (password.length >= 8) strengthScore++;
  if (password.length >= 12) strengthScore++;
  if (/[a-z]/.test(password)) strengthScore++;
  if (/[A-Z]/.test(password)) strengthScore++;
  if (/[0-9]/.test(password)) strengthScore++;
  if (/[^a-zA-Z0-9]/.test(password)) strengthScore++;
  
  let strength = PasswordStrength.WEAK;
  if (strengthScore >= 5) {
    strength = PasswordStrength.STRONG;
  } else if (strengthScore >= 3) {
    strength = PasswordStrength.MEDIUM;
  }
  
  return { isValid: true, strength };
};

export const validatePasswordConfirmation = (
  password: string, 
  confirmPassword: string
): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, message: 'Please confirm your password' };
  }
  
  if (password !== confirmPassword) {
    return { isValid: false, message: 'Passwords do not match' };
  }
  
  return { isValid: true };
};