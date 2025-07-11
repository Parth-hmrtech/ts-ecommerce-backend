
import cloudinary from '../config/cloudinaryConfig';
import fs from 'fs';
import path from 'path';

const uploadFile = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    fs.unlink(filePath, () => {});

    return result.secure_url;
  } catch (error: any) {
    throw new Error(error?.message || 'Cloudinary upload failed');
  }
};

export { uploadFile };
