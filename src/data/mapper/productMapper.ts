import { Product } from "@/domain/entities/productEntity";
import { CreateProductDto } from "../dto/productDto";

export function mapDtoToProduct(dto: any): Product {
  return {
    id: dto.id,
    userId: dto.userId,
    name: dto.name,
    categoryId: dto.categoryId,
    quantity: dto.quantity,
    minStock: dto.minStock ?? 0,
    acquisitionDate: dto.acquisitionDate,
    expiryDate: dto.expiryDate,
    price: dto.price,
    purchaseLocationId: dto.purchaseLocationId,
    brand: dto.brand,
    imageUrl: dto.imageUrl,
    barcode: dto.barcode,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

export function mapProductToCreateDto(product: Product): CreateProductDto {
  return {
    userId: product.userId,
    name: product.name,
    categoryId: product.categoryId,
    quantity: product.quantity,
    minStock: product.minStock,
    price: product.price ?? 0,
    brand: product.brand,
    barcode: product.barcode ?? "",
  };
}