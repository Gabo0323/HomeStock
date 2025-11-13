// data/mappers/productRatingMapper.ts

import { ProductRating } from "@/domain/entities/ratingEntity";
import { CreateRatingDto, RatingDto } from "../dto/ratingDto";


export class ProductRatingMapper {
  static fromDto(dto: RatingDto): ProductRating {
    return {
      id: dto.id,
      userId: dto.userId,
      productId: dto.productId,
      qualityScore: dto.qualityScore,
      notes: dto.notes,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    };
  }

  static toCreateDto(entity: CreateRatingDto): any {
    return {
      userId: entity.userId,
      productId: entity.productId,
      qualityScore: entity.qualityScore,
      notes: entity.notes,
    };
  }
}
