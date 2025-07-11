export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  role: 'seller' | 'buyer';
  phone_number: string;
  image_url: string;
  is_active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export type ICreateUser = Partial<
  Pick<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
> & Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
