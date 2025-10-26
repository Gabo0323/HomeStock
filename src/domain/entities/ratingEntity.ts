export interface ProductRating {
  id: number;
  userId: number;
  productId: number;
  qualityScore: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}