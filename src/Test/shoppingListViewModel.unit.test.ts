import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  UpdateShoppingListItemDto,
} from "@/data/dto/shoppingListDto";
import type { ShoppingList, ShoppingListItem } from "@/domain/entities/shoppinListEntity";
import type { ShoppingListWithItems } from "@/domain/repositories/shoppingListRepository";
import { AddItemToShoppingListUseCase } from "@/domain/useCases/addItemToShoppingListUseCase";
import { ConvertShoppingListToPurchaseUseCase } from "@/domain/useCases/convertShoppingListToPurchaseUseCase";
import { CreateShoppingListUseCase } from "@/domain/useCases/createShoppingListUseCase";
import { GenerateItemsFromLowStockUseCase } from "@/domain/useCases/generateItemsFromLowStockUseCase";
import { GetShoppingListByIdUseCase } from "@/domain/useCases/getShoppingListByIdUseCase";
import { GetShoppingListsByUserIdUseCase } from "@/domain/useCases/getShoppingListsByUserIdUseCase";
import { UpdateShoppingListItemUseCase } from "@/domain/useCases/updateShoppingListItemUseCase";
import { ShoppingListViewModel } from "@/presentation/viewModels/shoppingListViewModel";

type UseCaseMock<TArgs extends any[], TResult> = {
  execute: jest.Mock<Promise<TResult>, TArgs>;
};

describe("ShoppingListViewModel", () => {
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

  let createShoppingListUseCase: UseCaseMock<[CreateShoppingListDto], ShoppingList> &
    CreateShoppingListUseCase;
  let getShoppingListsByUserIdUseCase: UseCaseMock<[number], ShoppingList[]> &
    GetShoppingListsByUserIdUseCase;
  let getShoppingListByIdUseCase: UseCaseMock<[number], ShoppingListWithItems> &
    GetShoppingListByIdUseCase;
  let addItemToShoppingListUseCase: UseCaseMock<
    [number, AddItemToShoppingListDto],
    ShoppingListItem
  > &
    AddItemToShoppingListUseCase;
  let updateShoppingListItemUseCase: UseCaseMock<
    [number, number, UpdateShoppingListItemDto],
    ShoppingListItem
  > &
    UpdateShoppingListItemUseCase;
  let generateItemsFromLowStockUseCase: UseCaseMock<[number], ShoppingListWithItems> &
    GenerateItemsFromLowStockUseCase;
  let convertShoppingListToPurchaseUseCase: UseCaseMock<[number], ShoppingListWithItems> &
    ConvertShoppingListToPurchaseUseCase;
  let viewModel: ShoppingListViewModel;

  beforeEach(() => {
    createShoppingListUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[CreateShoppingListDto], ShoppingList> & CreateShoppingListUseCase;
    getShoppingListsByUserIdUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number], ShoppingList[]> & GetShoppingListsByUserIdUseCase;
    getShoppingListByIdUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number], ShoppingListWithItems> & GetShoppingListByIdUseCase;
    addItemToShoppingListUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number, AddItemToShoppingListDto], ShoppingListItem> &
      AddItemToShoppingListUseCase;
    updateShoppingListItemUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number, number, UpdateShoppingListItemDto], ShoppingListItem> &
      UpdateShoppingListItemUseCase;
    generateItemsFromLowStockUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number], ShoppingListWithItems> & GenerateItemsFromLowStockUseCase;
    convertShoppingListToPurchaseUseCase = {
      execute: jest.fn(),
    } as UseCaseMock<[number], ShoppingListWithItems> & ConvertShoppingListToPurchaseUseCase;

    viewModel = new ShoppingListViewModel(
      createShoppingListUseCase,
      getShoppingListsByUserIdUseCase,
      getShoppingListByIdUseCase,
      addItemToShoppingListUseCase,
      updateShoppingListItemUseCase,
      generateItemsFromLowStockUseCase,
      convertShoppingListToPurchaseUseCase,
    );
  });

  it("creates a shopping list and updates state", async () => {
    (createShoppingListUseCase.execute as jest.Mock).mockResolvedValue(shoppingList);

    await viewModel.createShoppingList({ userId: 17, name: "Compra semanal" });

    expect(createShoppingListUseCase.execute).toHaveBeenCalledWith({
      userId: 17,
      name: "Compra semanal",
    });
    expect(viewModel.shoppingLists).toContainEqual(shoppingList);
    expect(viewModel.selectedShoppingList).toEqual(shoppingList);
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();
  });

  it("loads shopping lists for a user", async () => {
    (getShoppingListsByUserIdUseCase.execute as jest.Mock).mockResolvedValue([shoppingList]);

    await viewModel.getShoppingListsByUserId(17);

    expect(getShoppingListsByUserIdUseCase.execute).toHaveBeenCalledWith(17);
    expect(viewModel.shoppingLists).toEqual([shoppingList]);
  });

  it("loads a shopping list detail and stores items", async () => {
    const detail: ShoppingListWithItems = { ...shoppingList, items: [shoppingListItem] };
    (getShoppingListByIdUseCase.execute as jest.Mock).mockResolvedValue(detail);

    await viewModel.getShoppingListById(2);

    expect(getShoppingListByIdUseCase.execute).toHaveBeenCalledWith(2);
    expect(viewModel.selectedShoppingListItems).toEqual([shoppingListItem]);
  });

  it("adds an item to the selected shopping list", async () => {
    viewModel.selectedShoppingListItems = [shoppingListItem];
    (addItemToShoppingListUseCase.execute as jest.Mock).mockResolvedValue({
      ...shoppingListItem,
      id: 4,
    });

    await viewModel.addItemToShoppingList(2, { productId: 99, desiredQuantity: 2 });

    expect(addItemToShoppingListUseCase.execute).toHaveBeenCalledWith(2, {
      productId: 99,
      desiredQuantity: 2,
    });
    expect(viewModel.selectedShoppingListItems).toHaveLength(2);
    expect(viewModel.selectedShoppingListItems[1].id).toBe(4);
  });

  it("updates an item inside the selected shopping list", async () => {
    viewModel.selectedShoppingListItems = [shoppingListItem];
    (updateShoppingListItemUseCase.execute as jest.Mock).mockResolvedValue({
      ...shoppingListItem,
      checked: true,
    });

    await viewModel.updateShoppingListItem(2, shoppingListItem.id, { checked: true });

    expect(updateShoppingListItemUseCase.execute).toHaveBeenCalledWith(2, shoppingListItem.id, {
      checked: true,
    });
    expect(viewModel.selectedShoppingListItems[0].checked).toBe(true);
  });

  it("generates items from low stock and refreshes detail", async () => {
    const detail: ShoppingListWithItems = {
      ...shoppingList,
      items: [shoppingListItem],
    };
    (generateItemsFromLowStockUseCase.execute as jest.Mock).mockResolvedValue(detail);

    await viewModel.generateItemsFromLowStock(2);

    expect(generateItemsFromLowStockUseCase.execute).toHaveBeenCalledWith(2);
    expect(viewModel.selectedShoppingListItems).toEqual([shoppingListItem]);
  });

  it("converts a shopping list to purchase", async () => {
    const detail: ShoppingListWithItems = {
      ...shoppingList,
      status: "COMPLETED",
      items: [shoppingListItem],
    };
    (convertShoppingListToPurchaseUseCase.execute as jest.Mock).mockResolvedValue(detail);

    await viewModel.convertListToPurchase(2);

    expect(convertShoppingListToPurchaseUseCase.execute).toHaveBeenCalledWith(2);
    expect(viewModel.selectedShoppingList?.status).toBe("COMPLETED");
  });

  it("stores the error message when an operation fails", async () => {
    (createShoppingListUseCase.execute as jest.Mock).mockRejectedValue(new Error("Boom"));

    await viewModel.createShoppingList({ userId: 17, name: "Compra semanal" });

    expect(viewModel.error).toBe("Boom");
    expect(viewModel.loading).toBe(false);
  });
});
