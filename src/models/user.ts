import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/dbConnect';
import bcrypt from 'bcrypt';

export interface UserAttributes {
  id: string;
  first_name?: string;
  last_name?: string;
  email: string;
  password_hash: string;
  role: 'seller' | 'buyer';
  phone_number?: string;
  image_url?: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type UserCreationAttributes = Optional<
  UserAttributes,
  | 'id'
  | 'first_name'
  | 'last_name'
  | 'phone_number'
  | 'image_url'
  | 'is_active'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
>;


class User extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes {
  public id!: string;
  public first_name?: string;
  public last_name?: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'seller' | 'buyer';
  public phone_number?: string;
  public image_url?: string;
  public is_active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public async validPassword(password: string): Promise<boolean> {
    if (!password || !this.password_hash) return false;
    return bcrypt.compare(password, this.password_hash);
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
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: false,
      validate: {
        isEmail: true,
      },
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
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    underscored: true,
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
          const salt = await bcrypt.genSalt(10);
          user.password_hash = await bcrypt.hash(user.password_hash, salt);
        }
      },
    },
  }
);

export type UserInstance = User;
export default User;
