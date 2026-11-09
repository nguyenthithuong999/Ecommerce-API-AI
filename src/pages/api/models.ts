export interface ApiResponse<T = any> {
  responseCode: number;
  message?: string;
  products?: T[];
  brands?: T[];
  user?: T;
}

export interface UserAccountResponse {
  responseCode: number;
  message: string;
}

export interface UserDetail {
  id: number;
  name: string;
  email: string;
  title?: string;
  birth_day?: string;
  birth_month?: string;
  birth_year?: string;
  first_name: string;
  last_name: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
}

export interface ProductCategory {
  usertype: {
    usertype: string;
  };
  category: string;
}

export interface ProductItem {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: ProductCategory;
}

export interface BrandItem {
  id: number;
  brand: string;
}

