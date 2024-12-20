export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface IPasswordReset extends Document {
  userId: string;
  resetToken: string;
  expiresAt: Date;
}

export interface IProducts {
  _id: string;
  userId: string;
  name: string;
  img: string;
  status: number;
  delete: number;
  subcategoryId: Subcategory | string;
  categoryId: Category | string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  subcategoryName?: string;
  categoryName?: string;
}

export interface Subcategory {
  _id: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
}
