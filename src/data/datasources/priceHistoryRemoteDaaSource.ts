import { axiosClient } from "@/api/axiosClient";
import { CreatePriceHistoryDto, PriceHistoryDto } from "../dto/priceHistoryDto";

export class PriceHistoryRemoteDataSource {
  /**
   * 📤 Crea un nuevo registro de historial de precios
   * Endpoint: POST /api/v1/price-history
   */
  async createPriceHistory(dto: CreatePriceHistoryDto): Promise<PriceHistoryDto> {
    try {
      const response = await axiosClient.post("/price-history", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear el historial de precios:", error);
      throw error;
    }
  }

  /**
   * 📥 Obtiene el último historial de precios de un producto
   * Endpoint: GET /api/v1/price-history/products/{productId}/last
   */
  async getLastPriceHistoryByProductId(productId: number): Promise<PriceHistoryDto> {
    try {
      const response = await axiosClient.get(`/price-history/products/${productId}/last`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener el último historial de precios:", error);
      throw error;
    }
  }
}
