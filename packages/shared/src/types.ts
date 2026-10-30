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


// src/types/hero.ts
export interface HeroData {
  id: number;
  title: string;
  subTitle: string;
  heroImage: string;
  button1: string;
  button1Link: string;
  button2?: string;       // optional: not every hero needs two buttons
  button2Link?: string;
  collections: string[];
}