import { axiosClient } from "../../api/axiosClient";
import type {
  CreateShoppingItemDto,
  ShoppingItemDto,
  UpdateShoppingItemDto,
} from "../dto/shoppingItemDto";

export class ShoppingItemRemoteDataSource {
  async createShoppingItem(dto: CreateShoppingItemDto): Promise<ShoppingItemDto> {
    try {
      const response = await axiosClient.post("/api/v1/shopping-items", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear shopping item:", error);
      throw error;
    }
  }

  async getPendingShoppingItems(userId: number): Promise<ShoppingItemDto[]> {
    try {
      const response = await axiosClient.get(`/api/v1/users/${userId}/shopping-items`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener shopping items pendientes:", error);
      throw error;
    }
  }

  async updateShoppingItem(
    shoppingItemId: number,
    dto: UpdateShoppingItemDto,
  ): Promise<ShoppingItemDto> {
    try {
      const response = await axiosClient.patch(
        `/api/v1/shopping-items/${shoppingItemId}`,
        dto,
      );
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar shopping item:", error);
      throw error;
    }
  }
}
