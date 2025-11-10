import { axiosClient } from "../../api/axiosClient";
import { CreateProductDto, ProductDto } from "../dto/productDto";

export class ProductRemoteDataSource {

    async createProduct(dto: CreateProductDto) {
    try {
      const response = await axiosClient.post("/products", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  }

  async getProductsByUserId(userId: number) {
    try {
      const response = await axiosClient.get(`/users/${userId}/products`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener productos del usuario:", error);
      throw error;
    }
  }

  async getProductById(productId: number) {
    try {
      const response = await axiosClient.get(`/products/${productId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  }

  async updateProduct(productId: number, dto: ProductDto) {
    try {
      const response = await axiosClient.patch(`/products/${productId}`, dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  }

  async deleteProduct(productId: number) {
    try {
      await axiosClient.delete(`/products/${productId}`);
      return true;
    } catch (error: any) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  }
}