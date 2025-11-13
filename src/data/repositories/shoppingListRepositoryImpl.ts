import type { ShoppingList, ShoppingListItem } from "@/domain/entities/shoppinListEntity";
import type {
  ShoppingListRepository,
  ShoppingListWithItems,
} from "@/domain/repositories/shoppingListRepository";
import { ShoppingListRemoteDataSource } from "../datasources/shoppingListRemoteDataSource";
import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  ShoppingListDto,
  UpdateShoppingListItemDto,
} from "../dto/shoppingListDto";
import {
  mapShoppingListDetailDtoToEntities,
  mapShoppingListDtoToEntity,
  mapShoppingListItemDtoToEntity,
} from "../mapper/shoppingListMapper";

export class ShoppingListRepositoryImpl implements ShoppingListRepository {
  private readonly remoteDataSource: ShoppingListRemoteDataSource;

  constructor(remoteDataSource: ShoppingListRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  private mapDetail(dto: ShoppingListDto): ShoppingListWithItems {
    const { shoppingList, items } = mapShoppingListDetailDtoToEntities(dto);
    return { ...shoppingList, items };
  }

  async createShoppingList(dto: CreateShoppingListDto): Promise<ShoppingList> {
    try {
      const result = await this.remoteDataSource.createShoppingList(dto);
      return mapShoppingListDtoToEntity(result);
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.createShoppingList:", error);
      throw error;
    }
  }

  async getShoppingListsByUserId(userId: number): Promise<ShoppingList[]> {
    try {
      const result = await this.remoteDataSource.getShoppingListsByUserId(userId);
      return result.map((dto: ShoppingListDto) => mapShoppingListDtoToEntity(dto));
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.getShoppingListsByUserId:", error);
      throw error;
    }
  }

  async getShoppingListById(shoppingListId: number): Promise<ShoppingListWithItems> {
    try {
      const result = await this.remoteDataSource.getShoppingListById(shoppingListId);
      return this.mapDetail(result);
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.getShoppingListById:", error);
      throw error;
    }
  }

  async addItemToShoppingList(
    shoppingListId: number,
    dto: AddItemToShoppingListDto,
  ): Promise<ShoppingListItem> {
    try {
      const result = await this.remoteDataSource.addItemToShoppingList(shoppingListId, dto);
      return mapShoppingListItemDtoToEntity(result);
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.addItemToShoppingList:", error);
      throw error;
    }
  }

  async updateShoppingListItem(
    shoppingListId: number,
    shoppingListItemId: number,
    dto: UpdateShoppingListItemDto,
  ): Promise<ShoppingListItem> {
    try {
      const result = await this.remoteDataSource.updateShoppingListItem(
        shoppingListId,
        shoppingListItemId,
        dto,
      );
      return mapShoppingListItemDtoToEntity(result);
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.updateShoppingListItem:", error);
      throw error;
    }
  }

  async generateItemsFromLowStock(shoppingListId: number): Promise<ShoppingListWithItems> {
    try {
      const result = await this.remoteDataSource.generateItemsFromLowStock(shoppingListId);
      return this.mapDetail(result);
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.generateItemsFromLowStock:", error);
      throw error;
    }
  }

  async convertListToPurchase(shoppingListId: number): Promise<ShoppingListWithItems> {
    try {
      const result = await this.remoteDataSource.convertListToPurchase(shoppingListId);
      return this.mapDetail(result);
    } catch (error) {
      console.error("Error en ShoppingListRepositoryImpl.convertListToPurchase:", error);
      throw error;
    }
  }
}
