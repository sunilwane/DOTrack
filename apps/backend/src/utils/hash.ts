import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const hashPassword = async (pwd: string) => {
  return bcrypt.hash(pwd, SALT_ROUNDS);
};

export const comparePassword = async (pwd: string, hashed: string) => {
  return bcrypt.compare(pwd, hashed);
};
