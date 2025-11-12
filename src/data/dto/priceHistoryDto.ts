export interface PriceHistoryDto {
  id: number;
  productId: number;
  unitPrice: number;
  storeId: number;
  recordedAt: string; // ✅ Agregado
  createdAt: string;
  updatedAt: string;
}

export interface CreatePriceHistoryDto {
  productId: number;
  unitPrice: number;
  storeId: number;
  recordedAt: string; // ✅ Agregado
}