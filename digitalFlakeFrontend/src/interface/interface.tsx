/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

export interface CustomTableProps {
  columns: Column[];
  data: any[];
  onAction?: (action: string, row: any) => void;
  onSearch?: (searchTerm: string) => void;
  title?: string;
  fetchData?: () => void;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface Category {
  _id: string;
  userId: string;
  name: string;
  img: string;
  status: number;
  delete: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export interface LogoutModalState {
  isOpen: boolean;
  modalType: string;
}

export interface Product {
  _id: string;
  userId: string;
  name: string;
  img: string;
  status: number;
  delete: number;
  subcategoryId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  subcategoryName: string;
  categoryName: string;
}

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export interface Subcategory {
  _id: string;
  categoryId: string;
  userId: string;
  name: string;
  img: string;
  status: number;
  delete: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  categoryName: string;
}

export interface SubcategoryState {
  subcategories: Subcategory[];
  loading: boolean;
  error: string | null;
}

export const options = [
  {
    label: "Active",
    value: "0",
  },
  {
    label: "Inactive",
    value: "1",
  },
];
