import { axiosClient } from "@/api/axiosClient";
import { CreateInventoryItemDto } from "../dto/inventoryDto";

export class InventoryRemoteDataSource {
  async getInventory(page: number, size: number) {
    const response = await axiosClient.get(`/inventory?page=0&size=1000`);
    return response.data;
  }

  async createInventoryItem(dto: CreateInventoryItemDto) {
    // 🔧 WORKAROUND: Usar endpoint existente con datos completos
    console.log('📤 Enviando al endpoint legacy /inventory:', dto);
    const response = await axiosClient.post(`/inventory`, dto);
    return response.data;
  }

  async bulkConsume(payload: { userId: number; items: { productId: number; quantity: number }[] }) {
    const response = await axiosClient.post(`/inventory/consume`, payload);
    return response.data;
  }

  async transferStock(payload: {
    userId: number;
    productId: number;
    fromLocationId: number;
    toLocationId: number;
    quantity: number;
  }) {
    const response = await axiosClient.post(`/inventory/transfer`, payload);
    return response.data;
  }
}