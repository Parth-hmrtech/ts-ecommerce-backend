import User from '../models/user';
import { UserAttributes, UserCreationAttributes } from '../models/user';

const findUser = async (userId: string): Promise<UserAttributes | null> => {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password_hash'] }, // safer!
  });

  return user?.get({ plain: true }) ?? null;
};

const updateUser = async ({ id, data,}: { id: string; data: Partial<UserCreationAttributes>; }): Promise<UserAttributes | null> => {
 
    const [affectedRows] = await User.update(data, {
    where: { id },
    });

    if (affectedRows > 0) {
        const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ['password_hash'] },
        });
        return updatedUser?.get({ plain: true }) ?? null;
    }

    return null;
};

const resetUserPassword = async ({ userId, oldPassword, newPassword,}: { userId: string; oldPassword: string; newPassword: string;}): Promise<{ success?: boolean; message?: string } | Omit<UserAttributes, 'password_hash'>> => {
  
    const user = await User.unscoped().findByPk(userId); 
    if (!user) {
        return { message: 'User not found' };
    }

    const isValid = await user.validPassword(oldPassword);
    if (!isValid) {
        return { message: 'Old password is incorrect' };
    }

    user.password_hash = newPassword;
    await user.save();

    const { password_hash, ...safeUser } = user.get({ plain: true });
    return safeUser;
};


export { findUser, updateUser, resetUserPassword };
