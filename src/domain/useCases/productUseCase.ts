import { ProductRepository } from "../repositories/productRepository";
import { CreateProductDto } from "../../data/dto/productDto";
import { Product } from "../entities/productEntity";

export class CreateProductUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(dto: CreateProductDto): Promise<Product> {
    // Aquí podemos agregar lógica adicional si queremos
    return await this.productRepository.createProduct(dto);
  }
}