import { Product } from "@/domain/entities/productEntity";
import { ProductRepository } from "../../domain/repositories/productRepository";
import { ProductRemoteDataSource } from "../datasources/productRemoteDataSource";
import { CreateProductDto, ProductDto } from "../dto/productDto";
import { mapDtoToProduct } from "../mapper/productMapper"; // <-- importa tu mapper

export class ProductRepositoryImpl implements ProductRepository {
  private remoteDataSource: ProductRemoteDataSource;

  constructor(remoteDataSource: ProductRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const result = await this.remoteDataSource.createProduct(dto);
      return mapDtoToProduct(result);
    } catch (error) {
      console.error("Error en ProductRepositoryImpl.createProduct:", error);
      throw error;
    }
  }

  async getProductsByUserId(userId: number): Promise<Product[]> {
    try {
      const result = await this.remoteDataSource.getProductsByUserId(userId);
      return result.map((dto: ProductDto) => mapDtoToProduct(dto));
    } catch (error) {
      console.error("Error en ProductRepositoryImpl.getProductsByUserId:", error);
      throw error;
    }
  }

  async getProductById(productId: number): Promise<Product> {
    try {
      const result = await this.remoteDataSource.getProductById(productId);
      return mapDtoToProduct(result);
    } catch (error) {
      console.error("Error en ProductRepositoryImpl.getProductById:", error);
      throw error;
    }
  }

  async updateProduct(productId: number, dto: ProductDto): Promise<Product> {
    try {
      const result = await this.remoteDataSource.updateProduct(productId, dto);
      return mapDtoToProduct(result);
    } catch (error) {
      console.error("Error en ProductRepositoryImpl.updateProduct:", error);
      throw error;
    }
  }

  async deleteProduct(productId: number): Promise<boolean> {
    try {
      return await this.remoteDataSource.deleteProduct(productId);
    } catch (error) {
      console.error("Error en ProductRepositoryImpl.deleteProduct:", error);
      throw error;
    }
  }

}