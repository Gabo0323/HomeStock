import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import type { ShoppingItemRepository } from "@/domain/repositories/shoppingItemRepository";
import { ShoppingItemRemoteDataSource } from "../datasources/shoppingItemRemoteDataSource";
import type {
  CreateShoppingItemDto,
  ShoppingItemDto,
  UpdateShoppingItemDto,
} from "../dto/shoppingItemDto";
import { mapShoppingItemDtoToEntity } from "../mapper/shoppingItemMapper";

export class ShoppingItemRepositoryImpl implements ShoppingItemRepository {
  private readonly remoteDataSource: ShoppingItemRemoteDataSource;

  constructor(remoteDataSource: ShoppingItemRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createShoppingItem(dto: CreateShoppingItemDto): Promise<ShoppingItem> {
    try {
      const result = await this.remoteDataSource.createShoppingItem(dto);
      return mapShoppingItemDtoToEntity(result);
    } catch (error) {
      console.error("Error en ShoppingItemRepositoryImpl.createShoppingItem:", error);
      throw error;
    }
  }

  async getPendingShoppingItems(userId: number): Promise<ShoppingItem[]> {
    try {
      const result = await this.remoteDataSource.getPendingShoppingItems(userId);
      return result.map((dto: ShoppingItemDto) => mapShoppingItemDtoToEntity(dto));
    } catch (error) {
      console.error("Error en ShoppingItemRepositoryImpl.getPendingShoppingItems:", error);
      throw error;
    }
  }

  async updateShoppingItem(
    shoppingItemId: number,
    dto: UpdateShoppingItemDto,
  ): Promise<ShoppingItem> {
    try {
      const result = await this.remoteDataSource.updateShoppingItem(shoppingItemId, dto);
      return mapShoppingItemDtoToEntity(result);
    } catch (error) {
      console.error("Error en ShoppingItemRepositoryImpl.updateShoppingItem:", error);
      throw error;
    }
  }
}
