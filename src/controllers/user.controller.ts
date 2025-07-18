import { Request, Response } from 'express';
import { findUser, updateUser, resetUserPassword } from '../service/user.service';
import { uploadFile } from '@/utils/uploadImage';

interface IAuthRequest extends Request {
  user?: {
    id: string;
  };
  file?: Express.Multer.File;
}

const getUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as IAuthRequest;

    if (!user?.id) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized: User not found',
      });
      return;
    }

    const foundUser = await findUser(user.id);

    res.status(200).json({
      error: false,
      message: 'User fetched successfully!',
      data: { user: foundUser },
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, file } = req as IAuthRequest;
    const userData = { ...req.body };
    if (file) {
      const imageUrl = await uploadFile(file.path);
      userData.image_url = imageUrl;
    }

    if (!user?.id) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized: User ID missing',
      });
      return;
    }

    const updated = await updateUser({ id: user.id, data: userData });

    res.status(200).json({
      error: false,
      message: 'Update successful',
      data: updated,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

const resetPasswordController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user } = req as IAuthRequest;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({
        error: true,
        message: 'Old password and new password are required',
      });
      return;
    }

    const result = await resetUserPassword({
      userId: user?.id!,
      oldPassword,
      newPassword,
    });

    res.status(200).json({
      error: false,
      message: 'Password reset successful',
      data: result,
    });
  } catch (error) {
    throw new Error(String(error));
  }
};

export {
  getUserController,
  updateUserController,
  resetPasswordController,
};
