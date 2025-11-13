export interface ShoppingListItemDto {
  id: number;
  listId: number;
  productId: number;
  desiredQuantity: number;
  checked: boolean;
  checkedAt?: string;
  targetStoreId?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface ShoppingListDto {
  id: number;
  userId: number;
  name: string;
  note?: string;
  status: string;
  items?: ShoppingListItemDto[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateShoppingListDto {
  userId: number;
  name: string;
  note?: string;
}

export interface ShoppingListListDto {
  shoppingLists: ShoppingListDto[];
}

export interface AddItemToShoppingListDto {
  productId: number;
  desiredQuantity: number;
  targetStoreId?: number;
}

export interface UpdateShoppingListItemDto {
  desiredQuantity?: number;
  checked?: boolean;
  targetStoreId?: number;
}
