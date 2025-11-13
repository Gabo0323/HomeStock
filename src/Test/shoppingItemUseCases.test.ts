import type { CreateShoppingItemDto, UpdateShoppingItemDto } from "@/data/dto/shoppingItemDto";
import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import type { ShoppingItemRepository } from "@/domain/repositories/shoppingItemRepository";
import { CreateShoppingItemUseCase } from "@/domain/useCases/createShoppingItemUseCase";
import { GetPendingShoppingItemsUseCase } from "@/domain/useCases/getPendingShoppingItemsUseCase";
import { UpdateShoppingItemUseCase } from "@/domain/useCases/updateShoppingItemUseCase";

describe("ShoppingItem use cases", () => {
  const shoppingItem: ShoppingItem = {
    id: 5,
    userId: 17,
    productId: 48,
    desiredQuantity: 1,
    purchased: false,
    source: "MANUAL",
    createdAt: "2025-11-13T02:22:15.320453Z",
    updatedAt: "2025-11-13T02:22:15.320453Z",
  };

  let repository: jest.Mocked<ShoppingItemRepository>;

  beforeEach(() => {
    repository = {
      createShoppingItem: jest.fn(),
      getPendingShoppingItems: jest.fn(),
      updateShoppingItem: jest.fn(),
    } as unknown as jest.Mocked<ShoppingItemRepository>;
  });

  it("delegates shopping item creation", async () => {
    repository.createShoppingItem.mockResolvedValue(shoppingItem);
    const useCase = new CreateShoppingItemUseCase(repository);
    const dto: CreateShoppingItemDto = {
      userId: 17,
      productId: 48,
      desiredQuantity: 1,
      source: "AUTO_RULE",
    };

    const result = await useCase.execute(dto);

    expect(repository.createShoppingItem).toHaveBeenCalledWith(dto);
    expect(result).toEqual(shoppingItem);
  });

  it("retrieves pending shopping items", async () => {
    repository.getPendingShoppingItems.mockResolvedValue([shoppingItem]);
    const useCase = new GetPendingShoppingItemsUseCase(repository);

    const items = await useCase.execute(17);

    expect(repository.getPendingShoppingItems).toHaveBeenCalledWith(17);
    expect(items).toEqual([shoppingItem]);
  });

  it("updates a shopping item", async () => {
    repository.updateShoppingItem.mockResolvedValue({ ...shoppingItem, purchased: true });
    const useCase = new UpdateShoppingItemUseCase(repository);
    const dto: UpdateShoppingItemDto = { purchased: true };

    const item = await useCase.execute(shoppingItem.id, dto);

    expect(repository.updateShoppingItem).toHaveBeenCalledWith(shoppingItem.id, dto);
    expect(item.purchased).toBe(true);
  });
});
