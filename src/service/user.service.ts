import User from '../models/user';
import { IUser, ICreateUser } from '../types/user.types';
import bcrypt from 'bcrypt';

const findUser = async (userId: string): Promise<Omit<IUser, 'password_hash'> | null> => {

    const user = await User.findByPk(userId, {

        attributes: { exclude: ['password_hash'] },

    });

return user;
};

const updateUser = async ({ id, data, }: { id: string; data: Partial<ICreateUser>; }): Promise<Omit<IUser, 'password_hash'> | null> => {

    const [affectedRows] = await User.update(data, {
        where: { id },
    });

    if (affectedRows > 0) {
        const updatedUser = await User.findByPk(id, {

            attributes: { exclude: ['password_hash'] },

        });
        return updatedUser;
    }
    return null;
};

const resetUserPassword = async ({ userId, oldPassword, newPassword, }: { userId: string; oldPassword: string; newPassword: string; }): Promise<{ success?: boolean; message?: string } | Omit<IUser, 'password_hash'>> => {

    const user = await User.unscoped().findByPk(userId);
   
    if (!user) {
        return { message: 'User not found' };
    }
   
    const isValid = await user.validPassword(oldPassword);
   
    if (!isValid) {
        return { message: 'Old password is incorrect' };
    }
   
    user.password_hash = await bcrypt.hash(newPassword, 10);
   
    await user.save();
   
    const { password_hash, ...safeUser } = user.get({ plain: true });
   
    return safeUser;
};

export { findUser, updateUser, resetUserPassword };
