import { mapShoppingItemDtoToEntity } from "@/data/mapper/shoppingItemMapper";
import type { ShoppingItemDto } from "@/data/dto/shoppingItemDto";

describe("shoppingItemMapper", () => {
  it("maps ShoppingItemDto to domain entity and fills defaults", () => {
    const dto: ShoppingItemDto = {
      id: 5,
      userId: 17,
      productId: 48,
      desiredQuantity: 1,
      purchased: false,
      source: "MANUAL",
      targetStoreId: 10,
      purchasedAt: undefined,
      createdAt: "2025-11-13T02:22:15.320453Z",
      updatedAt: undefined,
    };

    const entity = mapShoppingItemDtoToEntity(dto);

    expect(entity).toEqual({
      id: 5,
      userId: 17,
      productId: 48,
      desiredQuantity: 1,
      purchased: false,
      source: "MANUAL",
      targetStoreId: 10,
      purchasedAt: undefined,
      createdAt: "2025-11-13T02:22:15.320453Z",
      updatedAt: "2025-11-13T02:22:15.320453Z",
    });
  });
});
