export interface RatingDto {
  id: number;
  userId: number;
  productId: number;
  qualityScore: number;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateRatingDto {
  userId: number;
  productId: number;
  qualityScore: number;
  notes: string;
}