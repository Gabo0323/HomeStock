export interface PriceHistory {
  id: number;
  productId: number;
  unitPrice: number;
  storeId?: number;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}