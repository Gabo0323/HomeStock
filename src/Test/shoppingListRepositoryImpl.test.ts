import { ShoppingListRemoteDataSource } from "@/data/datasources/shoppingListRemoteDataSource";
import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  ShoppingListDto,
  ShoppingListItemDto,
  UpdateShoppingListItemDto,
} from "@/data/dto/shoppingListDto";
import { ShoppingListRepositoryImpl } from "@/data/repositories/shoppingListRepositoryImpl";

const shoppingListDto: ShoppingListDto = {
  id: 2,
  userId: 17,
  name: "Compra semanal",
  note: "Lista generada manualmente",
  status: "DRAFT",
  items: [],
  createdAt: "2025-11-13T02:13:27.963583Z",
  updatedAt: "2025-11-13T02:13:27.963583Z",
};

const shoppingListItemDto: ShoppingListItemDto = {
  id: 3,
  listId: 2,
  productId: 48,
  desiredQuantity: 1,
  checked: false,
  createdAt: "2025-11-13T02:23:29.060521Z",
  updatedAt: "2025-11-13T02:23:29.060521Z",
};

describe("ShoppingListRepositoryImpl", () => {
  let remote: ShoppingListRemoteDataSource;
  let repository: ShoppingListRepositoryImpl;

  beforeEach(() => {
    remote = new ShoppingListRemoteDataSource();
    repository = new ShoppingListRepositoryImpl(remote);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates a shopping list and maps the response", async () => {
    const dto: CreateShoppingListDto = { userId: 17, name: "Compra semanal", note: "Manual" };
    jest.spyOn(remote, "createShoppingList").mockResolvedValue(shoppingListDto);

    const result = await repository.createShoppingList(dto);

    expect(remote.createShoppingList).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: 2,
      userId: 17,
      name: "Compra semanal",
      note: "Lista generada manualmente",
      status: "DRAFT",
      createdAt: "2025-11-13T02:13:27.963583Z",
      updatedAt: "2025-11-13T02:13:27.963583Z",
    });
  });

  it("returns shopping lists mapped from DTOs", async () => {
    jest.spyOn(remote, "getShoppingListsByUserId").mockResolvedValue([shoppingListDto]);

    const lists = await repository.getShoppingListsByUserId(17);

    expect(remote.getShoppingListsByUserId).toHaveBeenCalledWith(17);
    expect(lists).toHaveLength(1);
    expect(lists[0].id).toBe(2);
  });

  it("fetches a shopping list detail and maps nested items", async () => {
    const detailDto: ShoppingListDto = {
      ...shoppingListDto,
      items: [shoppingListItemDto],
    };
    jest.spyOn(remote, "getShoppingListById").mockResolvedValue(detailDto);

    const detail = await repository.getShoppingListById(2);

    expect(remote.getShoppingListById).toHaveBeenCalledWith(2);
    expect(detail.items).toHaveLength(1);
    expect(detail.items[0].id).toBe(shoppingListItemDto.id);
  });

  it("adds an item to a shopping list", async () => {
    const dto: AddItemToShoppingListDto = { productId: 48, desiredQuantity: 2 };
    jest.spyOn(remote, "addItemToShoppingList").mockResolvedValue(shoppingListItemDto);

    const item = await repository.addItemToShoppingList(2, dto);

    expect(remote.addItemToShoppingList).toHaveBeenCalledWith(2, dto);
    expect(item.productId).toBe(48);
  });

  it("updates a shopping list item", async () => {
    const dto: UpdateShoppingListItemDto = { checked: true };
    jest.spyOn(remote, "updateShoppingListItem").mockResolvedValue({
      ...shoppingListItemDto,
      checked: true,
      updatedAt: "2025-11-13T02:24:29.060521Z",
    });

    const item = await repository.updateShoppingListItem(2, shoppingListItemDto.id, dto);

    expect(remote.updateShoppingListItem).toHaveBeenCalledWith(2, shoppingListItemDto.id, dto);
    expect(item.checked).toBe(true);
  });

  it("generates items from low stock", async () => {
    const detailDto: ShoppingListDto = {
      ...shoppingListDto,
      items: [shoppingListItemDto],
    };
    jest.spyOn(remote, "generateItemsFromLowStock").mockResolvedValue(detailDto);

    const detail = await repository.generateItemsFromLowStock(2);

    expect(remote.generateItemsFromLowStock).toHaveBeenCalledWith(2);
    expect(detail.items).toHaveLength(1);
  });

  it("converts a list to purchase", async () => {
    const detailDto: ShoppingListDto = {
      ...shoppingListDto,
      status: "COMPLETED",
      items: [shoppingListItemDto],
    };
    jest.spyOn(remote, "convertListToPurchase").mockResolvedValue(detailDto);

    const detail = await repository.convertListToPurchase(2);

    expect(remote.convertListToPurchase).toHaveBeenCalledWith(2);
    expect(detail.status).toBe("COMPLETED");
  });
});
