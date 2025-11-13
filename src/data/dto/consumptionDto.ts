export interface RegisterConsumptionDto {
  userId: number;
  productId: number;
  quantity: number;
  note?: string;
  occurredAt?: string; // Opcional (ISO string)
}

export interface ConsumptionDto {
  id: number;
  userId: number;
  productId: number;
  type: "CONSUMPTION";
  quantity: number;
  note?: string;
  occurredAt: string;
  createdAt: string;
}
