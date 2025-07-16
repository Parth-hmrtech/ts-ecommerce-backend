import { DataTypes, Model } from 'sequelize';
import sequelize from '@/config/dbConnect';
import bcrypt from 'bcrypt';
import {
  IUser,
  ICreateUser,
} from '@/types/user.types';

export class User extends Model<IUser, ICreateUser> implements IUser {
  declare id: string;
  declare first_name: string;
  declare last_name: string;
  declare email: string;
  declare password_hash: string;
  declare role: 'seller' | 'buyer';
  declare phone_number: string;
  declare image_url: string;
  declare is_active: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare deletedAt: Date | null;

  public async validPassword(password: string): Promise<boolean> {
    const storedHash = this.getDataValue('password_hash');
    return await bcrypt.compare(password, storedHash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('seller', 'buyer'),
      allowNull: false,
      defaultValue: 'buyer',
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
    defaultScope: {
      attributes: { exclude: ['password_hash'] },
    },
    indexes: [
      {
        unique: true,
        fields: ['email', 'role'],
      },
    ],
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password_hash) {
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password_hash')) {
          const current = user.getDataValue('password_hash');
          const isHashed = current.startsWith('$2b$') || current.startsWith('$2a$');
          if (!isHashed) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(current, salt);
          } else {
            console.log('[beforeUpdate] Skipping hashing — already hashed');
          }
        }
      },
    },
  }
);

export default User;
