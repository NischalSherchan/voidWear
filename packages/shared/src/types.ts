import type { ProductStatus } from "./constants";

export interface Product {
  id: string;
  name: string;
  price: number;
  status: ProductStatus;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
