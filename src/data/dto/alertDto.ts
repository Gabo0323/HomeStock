export interface AlertDto {
  id: number;
  userId: number;
  productId?: number;
  type: 'LOW_STOCK' | 'EXPIRY';
  message: string;
  triggerAt: string;
  active: boolean;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlertDto {
  userId: number;
  productId?: number;
  type: 'LOW_STOCK' | 'EXPIRY';
  message: string;
  triggerAt: string;
  active: boolean;
}

export interface AlertListDto {
  alerts: AlertDto[];
}
