import { CreateProductDto } from "../../data/dto/productDto";

export interface ProductRepository {
  createProduct(dto: CreateProductDto): Promise<any>;

}