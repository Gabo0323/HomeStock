import { ProductRepository } from "../repositories/productRepository";
import { Product } from "../entities/productEntity";

export class GetProductByIdUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: number): Promise<Product> {
    return await this.productRepository.getProductById(productId);
  }
}
