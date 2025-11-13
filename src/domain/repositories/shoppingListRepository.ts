import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  UpdateShoppingListItemDto,
} from "../../data/dto/shoppingListDto";
import type { ShoppingList, ShoppingListItem } from "../entities/shoppinListEntity";

export type ShoppingListWithItems = ShoppingList & { items: ShoppingListItem[] };

export interface ShoppingListRepository {
  createShoppingList(dto: CreateShoppingListDto): Promise<ShoppingList>;
  getShoppingListsByUserId(userId: number): Promise<ShoppingList[]>;
  getShoppingListById(shoppingListId: number): Promise<ShoppingListWithItems>;
  addItemToShoppingList(
    shoppingListId: number,
    dto: AddItemToShoppingListDto,
  ): Promise<ShoppingListItem>;
  updateShoppingListItem(
    shoppingListId: number,
    shoppingListItemId: number,
    dto: UpdateShoppingListItemDto,
  ): Promise<ShoppingListItem>;
  generateItemsFromLowStock(shoppingListId: number): Promise<ShoppingListWithItems>;
  convertListToPurchase(shoppingListId: number): Promise<ShoppingListWithItems>;
}
