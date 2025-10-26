export interface InventoryItemDto {
  id: number;
  userId: number;
  name: string;
  categoryId: number;
  quantity: number;
  minStock: number;
  acquisitionDate?: string; // opcional, no siempre viene
  expiryDate?: string;      // algunos productos la tienen
  price?: number;
  purchaseLocationId?: number;
  brand?: string;
  imageUrl?: string;
  barcode?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddStockEntryDto {
  userId: number;
  name: string;
  categoryId: number;
  quantity: number;
  minStock: number;
}

export interface BulkConsumeDto {
  userId: number;
  items: { productId: number; quantity: number }[];
}

export interface TransferStockDto {
  userId: number;
  productId: number;
  fromLocationId: number;
  toLocationId: number;
  quantity: number;
}