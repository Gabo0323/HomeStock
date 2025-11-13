import type { CreateShoppingItemDto, UpdateShoppingItemDto } from "@/data/dto/shoppingItemDto";
import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import { CreateShoppingItemUseCase } from "@/domain/useCases/createShoppingItemUseCase";
import { GetPendingShoppingItemsUseCase } from "@/domain/useCases/getPendingShoppingItemsUseCase";
import { UpdateShoppingItemUseCase } from "@/domain/useCases/updateShoppingItemUseCase";
import { ShoppingItemViewModel } from "@/presentation/viewModels/shoppingItemViewModel";

type UseCaseMock<TArgs extends any[], TResult> = {
  execute: jest.Mock<Promise<TResult>, TArgs>;
};

describe("ShoppingItemViewModel", () => {
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

  let createShoppingItemUseCase: UseCaseMock<[CreateShoppingItemDto], ShoppingItem> &
    CreateShoppingItemUseCase;
  let getPendingShoppingItemsUseCase: UseCaseMock<[number], ShoppingItem[]> &
    GetPendingShoppingItemsUseCase;
  let updateShoppingItemUseCase: UseCaseMock<[number, UpdateShoppingItemDto], ShoppingItem> &
    UpdateShoppingItemUseCase;
  let viewModel: ShoppingItemViewModel;

  beforeEach(() => {
    createShoppingItemUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[CreateShoppingItemDto], ShoppingItem> & CreateShoppingItemUseCase;
    getPendingShoppingItemsUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number], ShoppingItem[]> & GetPendingShoppingItemsUseCase;
    updateShoppingItemUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number, UpdateShoppingItemDto], ShoppingItem> & UpdateShoppingItemUseCase;

    viewModel = new ShoppingItemViewModel(
      createShoppingItemUseCase,
      getPendingShoppingItemsUseCase,
      updateShoppingItemUseCase,
    );
  });

  it("creates a shopping item and adds it to the collection", async () => {
    (createShoppingItemUseCase.execute as jest.Mock).mockResolvedValue(shoppingItem);

    await viewModel.createShoppingItem({
      userId: 17,
      productId: 48,
      desiredQuantity: 1,
      source: "AUTO_RULE",
    });

    expect(createShoppingItemUseCase.execute).toHaveBeenCalledWith({
      userId: 17,
      productId: 48,
      desiredQuantity: 1,
      source: "AUTO_RULE",
    });
    expect(viewModel.shoppingItems).toEqual([shoppingItem]);
    expect(viewModel.error).toBeNull();
  });

  it("loads pending shopping items", async () => {
    (getPendingShoppingItemsUseCase.execute as jest.Mock).mockResolvedValue([shoppingItem]);

    await viewModel.loadPendingShoppingItems(17);

    expect(getPendingShoppingItemsUseCase.execute).toHaveBeenCalledWith(17);
    expect(viewModel.shoppingItems).toEqual([shoppingItem]);
  });

  it("updates an existing shopping item", async () => {
    viewModel.shoppingItems = [shoppingItem];
    (updateShoppingItemUseCase.execute as jest.Mock).mockResolvedValue({
      ...shoppingItem,
      desiredQuantity: 3,
    });

    await viewModel.updateShoppingItem(shoppingItem.id, { desiredQuantity: 3 });

    expect(updateShoppingItemUseCase.execute).toHaveBeenCalledWith(shoppingItem.id, {
      desiredQuantity: 3,
    });
    expect(viewModel.shoppingItems[0].desiredQuantity).toBe(3);
  });

  it("stores an error when the update fails", async () => {
    (updateShoppingItemUseCase.execute as jest.Mock).mockRejectedValue(new Error("update-error"));

    await viewModel.updateShoppingItem(5, { desiredQuantity: 2 });

    expect(viewModel.error).toBe("update-error");
    expect(viewModel.loading).toBe(false);
  });
});
