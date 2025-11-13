export interface InventoryItemEntity {
  id: number;
  userId: number;
  name: string;
  categoryId: number;
  quantity: number;
  minStock: number;
  acquisitionDate?: string | null;
  expiryDate?: string | null;
  price?: number | null;
  purchaseLocationId?: number | null;
  brand?: string | null;
  imageUrl?: string | null;
  barcode?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryItemDto {
  userId: number;
  name: string;           // ✅ Requerido por backend
  categoryId: number;     // ✅ Requerido por backend
  quantity: number;
  minStock: number;
  acquisitionDate?: string;
  expiryDate?: string;
  price?: number;
  purchaseLocationId?: number;
  brand?: string;
  imageUrl?: string;
  barcode?: string;
}


export interface AddStockEntryDto {
  userId: number;
  productId: number;
  quantity: number;
  purchaseLocationId?: number;
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