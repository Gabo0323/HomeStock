import type {
  CreateShoppingItemDto,
  UpdateShoppingItemDto,
} from "@/data/dto/shoppingItemDto";
import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";

export interface ShoppingItemRepository {
  createShoppingItem(dto: CreateShoppingItemDto): Promise<ShoppingItem>;
  getPendingShoppingItems(userId: number): Promise<ShoppingItem[]>;
  updateShoppingItem(
    shoppingItemId: number,
    dto: UpdateShoppingItemDto,
  ): Promise<ShoppingItem>;
}
