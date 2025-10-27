import { ProductRepository } from "../../domain/repositories/productRepository";
import { ProductRemoteDataSource } from "../datasources/productRemoteDataSource";
import { CreateProductDto } from "../dto/productDto";
import { mapDtoToProduct } from "../mapper/productMapper"; // <-- importa tu mapper

export class ProductRepositoryImpl implements ProductRepository {
  private remoteDataSource: ProductRemoteDataSource;

  constructor(remoteDataSource: ProductRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  async createProduct(dto: CreateProductDto) {
    try {
      const result = await this.remoteDataSource.createProduct(dto);
      return mapDtoToProduct(result);
    } catch (error) {
      console.error("Error en ProductRepositoryImpl:", error);
      throw error;
    }
  }

  // Otros métodos siguen la misma estructura
  /*
  async getProducts() {
    const products = await this.remoteDataSource.getProducts();
    return products.map(mapDtoToProduct);
  }
  */
}