import { CreateProductDto, ProductDto } from "../../data/dto/productDto";
import { Product } from "../entities/productEntity";

export interface ProductRepository {
  createProduct(dto: CreateProductDto): Promise<Product>;
  getProductsByUserId(userId: number): Promise<Product[]>;
  getProductById(productId: number): Promise<Product>;
  updateProduct(productId: number, dto: ProductDto): Promise<Product>;
  deleteProduct(productId: number): Promise<boolean>;
}