export type ShoppingListStatus = 'DRAFT' | 'COMPLETED' | 'CANCELLED';

export interface ShoppingList {
  id: number;
  userId: number;
  name: string;
  note?: string;
  status: ShoppingListStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ShoppingListItem {
  id: number;
  listId: number;
  productId: number;
  desiredQuantity: number;
  checked: boolean;
  checkedAt?: string;
  targetStoreId?: number;
  createdAt: string;
  updatedAt: string;
}