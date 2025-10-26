export interface MovementDto {
  id: number;
  userId: number;
  productId: number;
  type: "PURCHASE" | "CONSUMPTION" | "ADJUSTMENT";
  quantity: number;
  unitPrice: number;
  storeId?: number;
  note?: string;
  occurredAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

/*
export interface CreateMovementDto {
  userId: number;
  productId: number;
  type: "PURCHASE" | "CONSUMPTION" | "ADJUSTMENT";
  quantity: number;
  unitPrice: number;
  storeId?: number;
  note?: string;
}

export interface UpdateMovementDto {
  id: number;
  type?: "PURCHASE" | "CONSUMPTION" | "ADJUSTMENT";
  quantity?: number;
  unitPrice?: number;
  storeId?: number;
  note?: string;
}

export interface MovementListDto {
  movements: MovementDto[];
}
*/