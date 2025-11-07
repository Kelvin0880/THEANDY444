import { encryptData, decryptData } from './encrypt';

const AUTH_TOKEN_KEY = 'andy_admin_token';
const SESSION_EXPIRY_KEY = 'andy_admin_expiry';

export const setAuthToken = (username: string): void => {
  const token = encryptData(username);
  const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(SESSION_EXPIRY_KEY, expiry.toString());
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const expiry = localStorage.getItem(SESSION_EXPIRY_KEY);
  
  if (!token || !expiry) {
    return null;
  }
  
  if (Date.now() > parseInt(expiry)) {
    clearAuthToken();
    return null;
  }
  
  try {
    return decryptData(token);
  } catch {
    return null;
  }
};

export const clearAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(SESSION_EXPIRY_KEY);
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
