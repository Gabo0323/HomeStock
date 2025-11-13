import {
  mapShoppingListDetailDtoToEntities,
  mapShoppingListDtoToEntity,
  mapShoppingListItemDtoToEntity,
} from "@/data/mapper/shoppingListMapper";
import type { ShoppingListDto, ShoppingListItemDto } from "@/data/dto/shoppingListDto";

describe("shoppingListMapper", () => {
  const shoppingListDto: ShoppingListDto = {
    id: 2,
    userId: 17,
    name: "Compra semanal",
    note: "Lista generada manualmente",
    status: "DRAFT",
    createdAt: "2025-11-13T02:13:27.963583Z",
    updatedAt: "2025-11-13T02:13:27.963583Z",
  };

  const shoppingListItemDto: ShoppingListItemDto = {
    id: 2,
    listId: 2,
    productId: 48,
    desiredQuantity: 1,
    checked: true,
    checkedAt: "2025-11-13T02:23:45.135089Z",
    targetStoreId: 4,
    createdAt: "2025-11-13T02:23:29.060521Z",
    updatedAt: "2025-11-13T02:24:29.060521Z",
  };

  it("maps ShoppingListDto to domain entity", () => {
    const entity = mapShoppingListDtoToEntity(shoppingListDto);

    expect(entity).toEqual({
      id: 2,
      userId: 17,
      name: "Compra semanal",
      note: "Lista generada manualmente",
      status: "DRAFT",
      createdAt: "2025-11-13T02:13:27.963583Z",
      updatedAt: "2025-11-13T02:13:27.963583Z",
    });
  });

  it("maps ShoppingListItemDto to domain entity with defaults", () => {
    const entity = mapShoppingListItemDtoToEntity({ ...shoppingListItemDto, updatedAt: undefined });

    expect(entity).toEqual({
      id: 2,
      listId: 2,
      productId: 48,
      desiredQuantity: 1,
      checked: true,
      checkedAt: "2025-11-13T02:23:45.135089Z",
      targetStoreId: 4,
      createdAt: "2025-11-13T02:23:29.060521Z",
      updatedAt: "2025-11-13T02:23:29.060521Z",
    });
  });

  it("maps ShoppingListDto with items to domain structures", () => {
    const detailDto: ShoppingListDto = {
      ...shoppingListDto,
      items: [shoppingListItemDto],
    };

    const { shoppingList, items } = mapShoppingListDetailDtoToEntities(detailDto);

    expect(shoppingList.id).toBe(shoppingListDto.id);
    expect(items).toHaveLength(1);
    expect(items[0].id).toBe(shoppingListItemDto.id);
  });
});
