// src/middleware/userAuthMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config({ path: '../.env' });

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

const userAuthMiddleware = (req: AuthenticatedRequest,res: Response,next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Use Bearer token in Authorization header.',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err: any) {
        return res.status(401).json({
            success: false,
            message:
                err.name === 'TokenExpiredError'
                    ? 'Token expired. Please log in again.'
                    : 'Invalid token. Authentication failed.',
        });
    }
};

export { userAuthMiddleware };
