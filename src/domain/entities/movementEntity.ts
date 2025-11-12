export type MovementType = "PURCHASE" | "CONSUMPTION" | "ADJUSTMENT";

export interface Movement {
  id: number;
  userId: number;
  productId: number;
  type: MovementType;
  quantity: number;
  unitPrice?: number;
  storeId?: number;
  note?: string;
  occurredAt: string;  // Fecha del evento (ISO)
  createdAt: string;   // Fecha de creación (ISO)
}
