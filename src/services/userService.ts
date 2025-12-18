/**
 * User and authentication service
 * Mock authentication using localStorage, easily upgradeable to real API
 */

import { getStorageItem, setStorageItem, STORAGE_KEYS, simulateApiDelay } from "./localStorage";

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  role: "user" | "admin";
}

export interface UserProfile extends User {
  phone?: string;
  addresses: Address[];
  preferences: UserPreferences;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  emailNotifications: boolean;
  favoriteGenres: string[];
}

interface StoredUser {
  user: User;
  passwordHash: string; // In real app, NEVER store passwords client-side
}

interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Register a new user
 */
export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  await simulateApiDelay(400);

  const users = getStorageItem<StoredUser[]>(STORAGE_KEYS.USERS, []);

  // Check if user already exists
  if (users.find((u) => u.user.email === email)) {
    return { success: false, error: "Email already registered" };
  }

  const newUser: User = {
    id: generateId(),
    email,
    name,
    createdAt: new Date().toISOString(),
    role: "user",
  };

  const storedUser: StoredUser = {
    user: newUser,
    passwordHash: btoa(password), // Simple encoding, NOT secure for production
  };

  users.push(storedUser);
  setStorageItem(STORAGE_KEYS.USERS, users);
  setStorageItem(STORAGE_KEYS.USER, newUser);

  return { success: true, user: newUser };
}

/**
 * Login user
 */
export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  await simulateApiDelay(400);

  const users = getStorageItem<StoredUser[]>(STORAGE_KEYS.USERS, []);
  const storedUser = users.find((u) => u.user.email === email);

  if (!storedUser) {
    return { success: false, error: "Invalid email or password" };
  }

  if (storedUser.passwordHash !== btoa(password)) {
    return { success: false, error: "Invalid email or password" };
  }

  setStorageItem(STORAGE_KEYS.USER, storedUser.user);
  return { success: true, user: storedUser.user };
}

/**
 * Logout user
 */
export async function logoutUser(): Promise<void> {
  await simulateApiDelay(100);
  setStorageItem(STORAGE_KEYS.USER, null);
}

/**
 * Get current logged-in user
 */
export function getCurrentUser(): User | null {
  return getStorageItem<User | null>(STORAGE_KEYS.USER, null);
}

/**
 * Update user profile
 */
export async function updateUserProfile(updates: Partial<User>): Promise<AuthResponse> {
  await simulateApiDelay(300);

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Not authenticated" };
  }

  const updatedUser = { ...currentUser, ...updates };
  setStorageItem(STORAGE_KEYS.USER, updatedUser);

  // Update in users array
  const users = getStorageItem<StoredUser[]>(STORAGE_KEYS.USERS, []);
  const userIndex = users.findIndex((u) => u.user.id === currentUser.id);
  if (userIndex !== -1) {
    users[userIndex].user = updatedUser;
    setStorageItem(STORAGE_KEYS.USERS, users);
  }

  return { success: true, user: updatedUser };
}

/**
 * Update user password
 */
export async function updatePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  await simulateApiDelay(300);

  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { success: false, error: "Not authenticated" };
  }

  const users = getStorageItem<StoredUser[]>(STORAGE_KEYS.USERS, []);
  const storedUser = users.find((u) => u.user.id === currentUser.id);

  if (!storedUser || storedUser.passwordHash !== btoa(currentPassword)) {
    return { success: false, error: "Current password is incorrect" };
  }

  storedUser.passwordHash = btoa(newPassword);
  setStorageItem(STORAGE_KEYS.USERS, users);

  return { success: true };
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === "admin";
}

/**
 * Generate unique ID
 */
function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
