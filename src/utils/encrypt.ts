import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const encryptData = (data: string): string => {
  return btoa(data);
};

export const decryptData = (encryptedData: string): string => {
  return atob(encryptedData);
};
