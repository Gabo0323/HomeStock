export interface ShoppingItemDto {
  id: number;
  userId: string;
  productId: string;
  desiredQuantity: number;
  purchased: boolean;
  purchasedAt?: Date;
  source: "AUTO_RULE" | "MANUAL";
  targetStoreId?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShoppingItemDto {
  userId: string;
  productId: string;
  desiredQuantity: number;
}

export interface UpdateShoppingItemDto {
  purchased?: boolean;
}

export interface ShoppingItemListDto {
  shoppingItems: ShoppingItemDto[];
}