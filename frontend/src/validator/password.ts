// src/validator/password.ts

// Minimum 12 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character.
export function validatePassword(password: string): string | null {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

  if (!password.trim()) {
    return "Password is required";
  }

  if (!passwordRegex.test(password)) {
    return "Password must be at least 12 characters and include an uppercase letter, lowercase letter, number, and special character.";
  }

  return null;
}

// Confirm Password Validation
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword.trim()) {
    return "Confirm password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
}