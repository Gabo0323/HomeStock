export interface AlertDto {
  id: number;
  userId: number;
  productId: number;
  type: "LOW_STOCK" | "EXPIRATION" | "CUSTOM";
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAlertDto {
  userId: number;
  productId: number;
  type: "LOW_STOCK" | "EXPIRATION" | "CUSTOM";
  message: string;
}

export interface UpdateAlertDto {
  message?: string;
}

export interface AlertListDto {
  alerts: AlertDto[];
}