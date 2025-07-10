import { Request, Response } from 'express';
import {
  createUser,
  loginUser,
  forgotUserPassword,
} from '../service/auth.service';
import { sendEmail } from '../utils/emailService';
import { generateRandomPassword } from '../utils/password';
import { uploadFile } from '../utils/uploadImage';
import { UniqueConstraintError } from 'sequelize';
import { UserCreationAttributes } from '../models/user';

const createUserController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const userData: UserCreationAttributes = { ...req.body };

    if (req.file?.path) {
      const imageUrl = await uploadFile(req.file.path);
      userData.image_url = imageUrl;
    }

    const user = await createUser(userData);

    return res.status(201).json({
      error: false,
      message: 'User registered successfully!',
      data: { user },
    });
  } catch (error: any) {
    console.error('User creation error:', error);

    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({
        error: true,
        message: 'Email already registered for this role.',
      });
    }

    if (error.message?.startsWith('Email is already registered as')) {
      return res.status(400).json({
        error: true,
        message: error.message,
      });
    }

    return res.status(500).json({
      error: true,
      message: error.message || 'Something went wrong.',
    });
  }
};


const loginUserController = async (req: Request, res: Response): Promise<Response> => {
  try {


    const { token, user } = await loginUser(req.body);


    return res.status(200).json({
      error: false,
      message: 'You have logged in successfully!',
      data: { user, token },
    });
  } catch (error: any) {
    console.error('Login error:', error.message);

    return res.status(401).json({
      error: true,
      message: error.message || 'Invalid login credentials',
    });
  }
};


const logoutUserController = (req: Request, res: Response): Response => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');

    return res.status(200).json({
      error: false,
      message: 'Logged out successfully',
      data: null,
    });
  });

  return res;
};


const forgotPasswordController = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      return res.status(400).json({
        status: 'error',
        message: 'Email and role are required',
      });
    }

    const newPassword = generateRandomPassword();

    const user = await forgotUserPassword(email, newPassword, role);

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    await sendEmail(newPassword, email);

    return res.json({
      status: 'success',
      message: 'Password sent to your email ID',
      data: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error: any) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};

export {
  createUserController,
  loginUserController,
  logoutUserController,
  forgotPasswordController,
};
