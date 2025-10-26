export interface Product {
  id: number;
  userId: number;
  name: string;
  categoryId: number;
  quantity: number;
  minStock: number;
  acquisitionDate?: string;
  expiryDate?: string;
  price?: number;
  purchaseLocationId?: number;
  brand?: string;
  imageUrl?: string;
  barcode?: string;
  createdAt: string;
  updatedAt: string;
}