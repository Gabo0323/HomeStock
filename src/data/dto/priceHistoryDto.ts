export interface PriceHistoryDto {
  id: number;
  productId: number;
  unitPrice: number;
  storeId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePriceHistoryDto {
  productId: number;
  unitPrice: number;
  storeId: number;
}