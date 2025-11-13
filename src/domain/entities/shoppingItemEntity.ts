export type ShoppingSource = 'AUTO_RULE' | 'MANUAL';

export interface ShoppingItem {
  id: number;
  userId: number;
  productId: number;
  desiredQuantity: number;
  purchased: boolean;
  purchasedAt?: string;
  source: ShoppingSource;
  targetStoreId?: number;
  createdAt: string;
  updatedAt: string;
}
