import { ShoppingItemRemoteDataSource } from "@/data/datasources/shoppingItemRemoteDataSource";
import type {
  CreateShoppingItemDto,
  ShoppingItemDto,
  UpdateShoppingItemDto,
} from "@/data/dto/shoppingItemDto";
import { ShoppingItemRepositoryImpl } from "@/data/repositories/shoppingItemRepositoryImpl";

describe("ShoppingItemRepositoryImpl", () => {
  let remote: ShoppingItemRemoteDataSource;
  let repository: ShoppingItemRepositoryImpl;

  const shoppingItemDto: ShoppingItemDto = {
    id: 5,
    userId: 17,
    productId: 48,
    desiredQuantity: 1,
    purchased: false,
    source: "MANUAL",
    targetStoreId: 3,
    createdAt: "2025-11-13T02:22:15.320453Z",
    updatedAt: "2025-11-13T02:22:15.320453Z",
  };

  beforeEach(() => {
    remote = new ShoppingItemRemoteDataSource();
    repository = new ShoppingItemRepositoryImpl(remote);
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates a shopping item", async () => {
    const dto: CreateShoppingItemDto = {
      userId: 17,
      productId: 48,
      desiredQuantity: 1,
      source: "AUTO_RULE",
      targetStoreId: 3,
    };
    jest.spyOn(remote, "createShoppingItem").mockResolvedValue(shoppingItemDto);

    const item = await repository.createShoppingItem(dto);

    expect(remote.createShoppingItem).toHaveBeenCalledWith(dto);
    expect(item.id).toBe(5);
  });

  it("lists pending shopping items", async () => {
    jest.spyOn(remote, "getPendingShoppingItems").mockResolvedValue([shoppingItemDto]);

    const items = await repository.getPendingShoppingItems(17);

    expect(remote.getPendingShoppingItems).toHaveBeenCalledWith(17);
    expect(items).toHaveLength(1);
    expect(items[0].productId).toBe(48);
  });

  it("updates a shopping item", async () => {
    const dto: UpdateShoppingItemDto = { purchased: true };
    jest.spyOn(remote, "updateShoppingItem").mockResolvedValue({
      ...shoppingItemDto,
      purchased: true,
      updatedAt: "2025-11-13T04:45:29.222Z",
    });

    const item = await repository.updateShoppingItem(shoppingItemDto.id, dto);

    expect(remote.updateShoppingItem).toHaveBeenCalledWith(shoppingItemDto.id, dto);
    expect(item.purchased).toBe(true);
  });
});
