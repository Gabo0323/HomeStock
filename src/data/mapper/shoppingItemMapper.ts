import { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import type { ShoppingItemDto } from "../dto/shoppingItemDto";

export function mapShoppingItemDtoToEntity(dto: ShoppingItemDto): ShoppingItem {
  return {
    id: dto.id,
    userId: dto.userId,
    productId: dto.productId,
    desiredQuantity: dto.desiredQuantity,
    purchased: dto.purchased,
    purchasedAt: dto.purchasedAt,
    source: dto.source,
    targetStoreId: dto.targetStoreId,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt ?? dto.createdAt,
  };
}
