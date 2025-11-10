import { ProductRepository } from "../repositories/productRepository";

export class DeleteProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: number): Promise<boolean> {
    return await this.productRepository.deleteProduct(productId);
  }
}
