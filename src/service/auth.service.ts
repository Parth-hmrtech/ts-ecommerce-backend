import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { IUser, ICreateUser } from '../types/user.types';

dotenv.config({ path: '../.env' });

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables.');
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

interface LoginUserInput {
  email: string;
  password: string;
  role: 'buyer' | 'seller';
}

interface JwtPayload {
  id: string;
  email: string;
  role: 'buyer' | 'seller';
}

const createUser = async (userBody: ICreateUser): Promise<User> => {
  const { email, role } = userBody;

  if (!email || !role) {
    throw new Error('Email and role are required.');
  }

  const existingUser = await User.findOne({ where: { email, role } });

  if (existingUser) {
    throw new Error(`Email is already registered as a ${role}.`);
  }

  return await User.create(userBody);
};

const loginUser = async ({
  email,
  password,
  role,
}: LoginUserInput): Promise<{ token: string; user: Omit<IUser, 'password_hash'> }> => {
  const user = await User.unscoped().findOne({
    where: { email, role, is_active: true },
  });

  if (!user) {
    throw new Error('Invalid email, password, or role');
  }

  const isPasswordValid = typeof user.validPassword === 'function'
    ? await user.validPassword(password)
    : await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error('Invalid email, password, or role');
  }

  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, JWT_SECRET as Secret, {
    expiresIn: JWT_EXPIRES_IN,
  } as SignOptions);

  const { password_hash, ...safeUser } = user.get({ plain: true }) as IUser;

  return { token, user: safeUser };
};

const forgotUserPassword = async (
  email: string,
  newPassword: string,
  role: 'buyer' | 'seller'
): Promise<User | null> => {
  try {
    const user = await User.findOne({ where: { email, role } });

    if (!user) {
      return null;
    }

    user.password_hash = await bcrypt.hash(newPassword, 10);
    await user.save();
    return user;
  } catch (error) {
    console.error('Failed to reset password:', error);
    return null;
  }
};

const isValidUser = async ({ id }: { id: string }): Promise<Omit<IUser, 'password_hash'> | null> => {
  if (!id) return null;

  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password_hash'] },
  });

  return user?.get({ plain: true }) as Omit<IUser, 'password_hash'> || null;
};

export {
  createUser,
  loginUser,
  forgotUserPassword,
  isValidUser,
};
