export interface PriceHistory {
  amount: number;
  id: number;
  productId: number;
  unitPrice: number;
  storeId?: number;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}