// src/Validators/valid.email.ts

export function validateEmail(email: string): string | null {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) return "Email is required";
  if (!regex.test(email)) return "Invalid email address";

  return null;
}