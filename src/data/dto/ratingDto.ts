// data/dto/productRatingDto.ts
export interface RatingDto {
  id: number;
  userId: number;
  productId: number;
  qualityScore: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string; // opcional
}

export interface CreateRatingDto {
  userId: number;
  productId: number;
  qualityScore: number;
  notes?: string;
}
