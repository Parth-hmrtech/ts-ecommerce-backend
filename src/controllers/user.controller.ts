import { Request, Response } from 'express';
import { findUser, updateUser, resetUserPassword } from '../service/user.service';
import { uploadFile } from '../utils/uploadImage';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
  file?: Express.Multer.File;
}

const getUserController = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized: User not found',
      });
    }

    const user = await findUser(userId);

    return res.status(200).json({
      error: false,
      message: 'User fetched successfully!',
      data: { user },
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return res.status(500).json({
      error: true,
      message: error.message || 'Failed to fetch user',
    });
  }
};

const updateUserController = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userData = { ...req.body };

    if (req.file) {
      const filePath = req.file.path;
      const imageUrl = await uploadFile(filePath);
      userData.image_url = imageUrl;
    } else {
      console.log('[Update User] No file uploaded');
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized: User ID missing',
      });
    }

    const updated = await updateUser({ id: userId, data: userData });

    return res.status(200).json({
      error: false,
      message: 'Update successful',
      data: updated,
    });
  } catch (error: any) {
    console.error('Update user error:', error);
    return res.status(500).json({
      error: true,
      message: error.message || 'Something went wrong while updating the profile',
    });
  }
};

const resetPasswordController = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        error: true,
        message: 'Old password and new password are required',
      });
    }

    const result = await resetUserPassword({ userId: req.user?.id!, oldPassword, newPassword });

    return res.status(200).json({
      error: false,
      message: 'Password reset successful',
      data: result,
    });
  } catch (error: any) {
    console.error('Reset password error:', error);
    return res.status(500).json({
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
