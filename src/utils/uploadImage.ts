// /src/utils/uploadImage.ts

import cloudinary from '../config/cloudinaryConfig';
import fs from 'fs';
import path from 'path';

const uploadFile = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    console.log("Uploaded to Cloudinary:", result.secure_url);

    // Delete the local file after successful upload
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting local file:", err);
      } else {
        console.log("Local file deleted:", filePath);
      }
    });

    return result.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    throw new Error(error?.message || 'Cloudinary upload failed');
  }
};

export { uploadFile };
