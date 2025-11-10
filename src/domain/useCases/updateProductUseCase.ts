import { ProductRepository } from "../repositories/productRepository";
import { Product } from "../entities/productEntity";
import { ProductDto } from "../../data/dto/productDto";

export class UpdateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(productId: number, dto: ProductDto): Promise<Product> {
    return await this.productRepository.updateProduct(productId, dto);
  }
}
