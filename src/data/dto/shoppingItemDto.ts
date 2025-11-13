export interface ShoppingItemDto {
  id: number;
  userId: number;
  productId: number;
  desiredQuantity: number;
  purchased: boolean;
  purchasedAt?: string;
  source: "AUTO_RULE" | "MANUAL";
  targetStoreId?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateShoppingItemDto {
  userId: number;
  productId: number;
  desiredQuantity: number;
  source: "AUTO_RULE" | "MANUAL";
  targetStoreId?: number;
}

export interface UpdateShoppingItemDto {
  desiredQuantity?: number;
  purchased?: boolean;
  purchasedAt?: string;
  targetStoreId?: number;
}

export interface ShoppingItemListDto {
  shoppingItems: ShoppingItemDto[];
}
