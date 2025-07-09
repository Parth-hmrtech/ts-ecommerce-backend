// types/user.types.ts
import { Model } from 'sequelize';

export interface UserAttributes {
  id: number;
  email: string;
  role: string;
  is_active: boolean;
  password_hash?: string;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {
  validPassword: (password: string) => Promise<boolean>;
}
