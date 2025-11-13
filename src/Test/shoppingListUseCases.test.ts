import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  UpdateShoppingListItemDto,
} from "@/data/dto/shoppingListDto";
import type { ShoppingList, ShoppingListItem } from "@/domain/entities/shoppinListEntity";
import type { ShoppingListRepository, ShoppingListWithItems } from "@/domain/repositories/shoppingListRepository";
import { AddItemToShoppingListUseCase } from "@/domain/useCases/addItemToShoppingListUseCase";
import { ConvertShoppingListToPurchaseUseCase } from "@/domain/useCases/convertShoppingListToPurchaseUseCase";
import { CreateShoppingListUseCase } from "@/domain/useCases/createShoppingListUseCase";
import { GenerateItemsFromLowStockUseCase } from "@/domain/useCases/generateItemsFromLowStockUseCase";
import { GetShoppingListByIdUseCase } from "@/domain/useCases/getShoppingListByIdUseCase";
import { GetShoppingListsByUserIdUseCase } from "@/domain/useCases/getShoppingListsByUserIdUseCase";
import { UpdateShoppingListItemUseCase } from "@/domain/useCases/updateShoppingListItemUseCase";

describe("ShoppingList use cases", () => {
  const shoppingList: ShoppingList = {
    id: 2,
    userId: 17,
    name: "Compra semanal",
    note: "Lista generada manualmente",
    status: "DRAFT",
    createdAt: "2025-11-13T02:13:27.963583Z",
    updatedAt: "2025-11-13T02:13:27.963583Z",
  };

  const shoppingListItem: ShoppingListItem = {
    id: 3,
    listId: 2,
    productId: 48,
    desiredQuantity: 1,
    checked: false,
    createdAt: "2025-11-13T02:23:29.060521Z",
    updatedAt: "2025-11-13T02:23:29.060521Z",
  };

  let repository: jest.Mocked<ShoppingListRepository>;

  beforeEach(() => {
    repository = {
      createShoppingList: jest.fn(),
      getShoppingListsByUserId: jest.fn(),
      getShoppingListById: jest.fn(),
      addItemToShoppingList: jest.fn(),
      updateShoppingListItem: jest.fn(),
      generateItemsFromLowStock: jest.fn(),
      convertListToPurchase: jest.fn(),
    } as unknown as jest.Mocked<ShoppingListRepository>;
  });

  it("delegates shopping list creation", async () => {
    repository.createShoppingList.mockResolvedValue(shoppingList);
    const useCase = new CreateShoppingListUseCase(repository);
    const dto: CreateShoppingListDto = { userId: 17, name: "Compra semanal" };

    const result = await useCase.execute(dto);

    expect(repository.createShoppingList).toHaveBeenCalledWith(dto);
    expect(result).toEqual(shoppingList);
  });

  it("retrieves shopping lists by user", async () => {
    repository.getShoppingListsByUserId.mockResolvedValue([shoppingList]);
    const useCase = new GetShoppingListsByUserIdUseCase(repository);

    const lists = await useCase.execute(17);

    expect(repository.getShoppingListsByUserId).toHaveBeenCalledWith(17);
    expect(lists).toEqual([shoppingList]);
  });

  it("retrieves a shopping list detail", async () => {
    const detail: ShoppingListWithItems = { ...shoppingList, items: [shoppingListItem] };
    repository.getShoppingListById.mockResolvedValue(detail);
    const useCase = new GetShoppingListByIdUseCase(repository);

    const result = await useCase.execute(2);

    expect(repository.getShoppingListById).toHaveBeenCalledWith(2);
    expect(result).toEqual(detail);
  });

  it("adds an item to a shopping list", async () => {
    repository.addItemToShoppingList.mockResolvedValue(shoppingListItem);
    const useCase = new AddItemToShoppingListUseCase(repository);
    const dto: AddItemToShoppingListDto = { productId: 48, desiredQuantity: 1 };

    const item = await useCase.execute(2, dto);

    expect(repository.addItemToShoppingList).toHaveBeenCalledWith(2, dto);
    expect(item).toEqual(shoppingListItem);
  });

  it("updates a shopping list item", async () => {
    repository.updateShoppingListItem.mockResolvedValue({ ...shoppingListItem, checked: true });
    const useCase = new UpdateShoppingListItemUseCase(repository);
    const dto: UpdateShoppingListItemDto = { checked: true };

    const item = await useCase.execute(2, shoppingListItem.id, dto);

    expect(repository.updateShoppingListItem).toHaveBeenCalledWith(2, shoppingListItem.id, dto);
    expect(item.checked).toBe(true);
  });

  it("generates items from low stock", async () => {
    const detail: ShoppingListWithItems = { ...shoppingList, items: [shoppingListItem] };
    repository.generateItemsFromLowStock.mockResolvedValue(detail);
    const useCase = new GenerateItemsFromLowStockUseCase(repository);

    const result = await useCase.execute(2);

    expect(repository.generateItemsFromLowStock).toHaveBeenCalledWith(2);
    expect(result).toEqual(detail);
  });

  it("converts a list to purchase", async () => {
    const detail: ShoppingListWithItems = {
      ...shoppingList,
      status: "COMPLETED",
      items: [shoppingListItem],
    };
    repository.convertListToPurchase.mockResolvedValue(detail);
    const useCase = new ConvertShoppingListToPurchaseUseCase(repository);

    const result = await useCase.execute(2);

    expect(repository.convertListToPurchase).toHaveBeenCalledWith(2);
    expect(result.status).toBe("COMPLETED");
  });
});
