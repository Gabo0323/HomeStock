export type MovementType = 'PURCHASE' | 'CONSUMPTION' | 'ADJUSTMENT';

export interface Movement {
  id: number;
  userId: number;
  productId: number;
  type: MovementType;
  quantity: number;
  unitPrice?: number;
  storeId?: number;
  note?: string;
  occurredAt: string;
  createdAt: string;
  updatedAt: string;
}