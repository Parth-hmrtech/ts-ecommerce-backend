import { Request, Response } from 'express';
import { findUser, updateUser, resetUserPassword } from '../service/user.service';
import { uploadFile } from '../utils/uploadImage';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
  file?: Express.Multer.File;
}

const getUserController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized: User not found',
      });
      return;
    }

    const user = await findUser(userId);

    res.status(200).json({
      error: false,
      message: 'User fetched successfully!',
      data: { user },
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch user',
    });
  }
};

const updateUserController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userData = { ...req.body };

    if (req.file) {
      const imageUrl = await uploadFile(req.file.path);
      userData.image_url = imageUrl;
    }

    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({
        error: true,
        message: 'Unauthorized: User ID missing',
      });
      return;
    }

    const updated = await updateUser({ id: userId, data: userData });

    res.status(200).json({
      error: false,
      message: 'Update successful',
      data: updated,
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: true,
      message: error.message || 'Something went wrong while updating the profile',
    });
  }
};

const resetPasswordController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      res.status(400).json({
        error: true,
        message: 'Old password and new password are required',
      });
      return;
    }

    const result = await resetUserPassword({
      userId: req.user?.id!,
      oldPassword,
      newPassword,
    });

    res.status(200).json({
      error: false,
      message: 'Password reset successful',
      data: result,
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    res.status(500).json({
      error: true,
      message: error.message || 'Something went wrong while resetting the password',
    });
  }
};

export {
  getUserController,
  updateUserController,
  resetPasswordController,
};
