import { ShoppingList, ShoppingListItem } from "@/domain/entities/shoppinListEntity";
import type { ShoppingListDto, ShoppingListItemDto } from "../dto/shoppingListDto";

export function mapShoppingListDtoToEntity(dto: ShoppingListDto): ShoppingList {
  return {
    id: dto.id,
    userId: dto.userId,
    name: dto.name,
    note: dto.note,
    status: dto.status as ShoppingList["status"],
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapShoppingListItemDtoToEntity(dto: ShoppingListItemDto): ShoppingListItem {
  return {
    id: dto.id,
    listId: dto.listId,
    productId: dto.productId,
    desiredQuantity: dto.desiredQuantity,
    checked: dto.checked,
    checkedAt: dto.checkedAt,
    targetStoreId: dto.targetStoreId,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt ?? dto.createdAt,
  };
}

export function mapShoppingListDetailDtoToEntities(dto: ShoppingListDto) {
  const shoppingList = mapShoppingListDtoToEntity(dto);
  const items = (dto.items ?? []).map(mapShoppingListItemDtoToEntity);
  return { shoppingList, items };
}
