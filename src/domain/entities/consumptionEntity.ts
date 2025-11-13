export interface Consumption {
  id: number;
  userId: number;
  productId: number;
  type: "CONSUMPTION";
  quantity: number;
  note?: string;
  occurredAt: string;  // Fecha del consumo (ISO)
  createdAt: string;   // Fecha de creación (ISO)
}
