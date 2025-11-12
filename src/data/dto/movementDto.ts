export interface CreateMovementDto {
  userId: number;
  productId: number;
  type: "PURCHASE" | "CONSUMPTION" | "ADJUSTMENT";
  quantity: number;
  unitPrice?: number;
  storeId?: number;
  note?: string;
  occurredAt: string; // ISO string, ej. "2025-11-12T20:17:28.252Z"
}

export interface MovementDto {
  id: number;
  userId: number;
  productId: number;
  type: "PURCHASE" | "CONSUMPTION" | "ADJUSTMENT";
  quantity: number;
  unitPrice?: number;
  storeId?: number;
  note?: string;
  occurredAt: string;
  createdAt: string;
}
