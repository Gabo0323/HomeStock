import { axiosClient } from "../../api/axiosClient";
import { CreateProductDto } from "../dto/productDto";

export class ProductRemoteDataSource {

    /*
  async getProducts(): Promise<ProductDto[]> {
    const response = await axiosClient.get<ProductDto[]>("/products");
    return response.data;
  }
    */

    async createProduct(dto: CreateProductDto) {
    try {
      const response = await axiosClient.post("/products", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  }

}