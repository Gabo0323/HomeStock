// data/remote/StoreRemoteDataSource.ts


import { axiosClient } from "../../api/axiosClient";
import { StoreDto, CreateStoreDto, UpdateStoreDto } from "../dto/storeDto";

export class StoreRemoteDataSource {

  /**
   * GET /stores
   * Obtiene todas las tiendas
   */
  async getAllStores(): Promise<StoreDto[]> {
    try {
      const response = await axiosClient.get("/stores");
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener stores:", error);
      throw error;
    }
  }

  /**
   * POST /stores
   * Crea una nueva tienda
   */
  async createStore(dto: CreateStoreDto): Promise<StoreDto> {
    try {
      const response = await axiosClient.post("/stores", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear store:", error);
      throw error;
    }
  }

  /**
   * PATCH /stores/{storeId}
   * Actualiza una tienda
   */
  async updateStore(storeId: number, dto: UpdateStoreDto): Promise<StoreDto> {
    try {
      const response = await axiosClient.patch(`/stores/${storeId}`, dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar store:", error);
      throw error;
    }
  }

  /**
   * DELETE /stores/{storeId}
   */
  async deleteStore(storeId: number): Promise<boolean> {
    try {
      await axiosClient.delete(`/stores/${storeId}`);
      return true;
    } catch (error: any) {
      console.error("Error al eliminar store:", error);
      throw error;
    }
  }
}
