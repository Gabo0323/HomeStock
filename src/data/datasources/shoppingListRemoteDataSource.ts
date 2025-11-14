import { axiosClient } from "../../api/axiosClient";
import type {
  AddItemToShoppingListDto,
  CreateShoppingListDto,
  ShoppingListDto,
  ShoppingListItemDto,
  UpdateShoppingListItemDto,
} from "../dto/shoppingListDto";

export class ShoppingListRemoteDataSource {
  async createShoppingList(dto: CreateShoppingListDto): Promise<ShoppingListDto> {
    try {
      const response = await axiosClient.post("/shopping-lists", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear lista de compras:", error);
      throw error;
    }
  }

  async getShoppingListsByUserId(userId: number): Promise<ShoppingListDto[]> {
    try {
      const response = await axiosClient.get("/shopping-lists", { params: { userId } });
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener listas de compras del usuario:", error);
      throw error;
    }
  }

  async getShoppingListById(shoppingListId: number): Promise<ShoppingListDto> {
    try {
      const response = await axiosClient.get(`/shopping-lists/${shoppingListId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener detalle de lista de compras:", error);
      throw error;
    }
  }

  async addItemToShoppingList(
    shoppingListId: number,
    dto: AddItemToShoppingListDto,
  ): Promise<ShoppingListItemDto> {
    try {
      const response = await axiosClient.post(
        `/shopping-lists/${shoppingListId}/items`,
        dto,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error al agregar item a lista de compras:", error);
      throw error;
    }
  }

  async updateShoppingListItem(
    shoppingListId: number,
    shoppingListItemId: number,
    dto: UpdateShoppingListItemDto,
  ): Promise<ShoppingListItemDto> {
    try {
      const response = await axiosClient.patch(
        `/shopping-lists/${shoppingListId}/items/${shoppingListItemId}`,
        dto,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar item de lista de compras:", error);
      throw error;
    }
  }

  async generateItemsFromLowStock(shoppingListId: number): Promise<ShoppingListDto> {
    try {
      const response = await axiosClient.post(
        `/shopping-lists/${shoppingListId}/generate-from-low-stock`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error al generar items desde bajo stock:", error);
      throw error;
    }
  }

  async convertListToPurchase(shoppingListId: number): Promise<ShoppingListDto> {
    try {
      const response = await axiosClient.post(
        `/shopping-lists/${shoppingListId}/to-purchase`,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error al convertir lista a compra:", error);
      throw error;
    }
  }
}
