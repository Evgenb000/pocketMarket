export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  images: string[];
  is_available: boolean;
  stock_quantity: number;
  sku: string | null;
  weight: number | null;
  dimensions: ProductDimensions | null;
  meta_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  slug: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">;
export type ProductUpdate = Partial<ProductInsert>;
export type CategoryInsert = Omit<Category, "id" | "created_at" | "updated_at">;
