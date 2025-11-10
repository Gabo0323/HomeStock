import { ProductRepository } from "../repositories/productRepository";
import { Product } from "../entities/productEntity";

export class GetProductsByUserIdUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(userId: number): Promise<Product[]> {
    return await this.productRepository.getProductsByUserId(userId);
  }
}
