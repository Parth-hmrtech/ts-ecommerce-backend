import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import users, { UserInstance, UserCreationAttributes } from '../models/user';

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

/**
 * Register a new user
 */
const createUser = async (userBody: UserCreationAttributes): Promise<UserInstance> => {
  const { email, role } = userBody;

  if (!email || !role) {
    throw new Error('Email and role are required.');
  }

  const existingUser = await users.findOne({ where: { email, role } });

  if (existingUser) {
    throw new Error(`Email is already registered as a ${role}.`);
  }

  const newUser = await users.create(userBody);
  return newUser;
};

/**
 * Login existing user
 */
const loginUser = async ({
  email,
  password,
  role,
}: LoginUserInput): Promise<{ token: string; user: UserInstance }> => {
  const user = await users.findOne({
    where: {
      email,
      role,
      is_active: true,
    },
  });
  console.log(user);
  
  if (!user || !(await user.validPassword(password))) {
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

  return { token, user };
};

/**
 * Reset user password (used in forgot password flow)
 */
const forgotUserPassword = async (
  email: string,
  newPassword: string,
  role: 'buyer' | 'seller'
): Promise<UserInstance | null> => {
  const user = await users.findOne({ where: { email, role } });

  if (!user) return null;

  // Hash new password before saving
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password_hash = hashedPassword;

  await user.save();

  return user;
};

/**
 * Validate user by ID
 */
const isValidUser = async ({
  id,
}: {
  id: string;
}): Promise<UserInstance | null> => {
  if (!id) return null;

  const user = await users.findOne({
    where: { id },
    attributes: { exclude: ['password_hash'] },
  });

  return user;
};

export {
  createUser,
  loginUser,
  forgotUserPassword,
  isValidUser,
};
