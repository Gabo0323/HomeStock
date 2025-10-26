export interface ShoppingListDto {
  id: number;
  userId: number;
  name: string;
  note: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
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
  userId: number;
  name: string;
  note?: string;
}

export interface UpdateShoppingListItemDto {
  checked: boolean;
}

