export interface RegisterConsumptionDto {
  userId: number;
  productId: number;
  quantity: number;
  note?: string;
}