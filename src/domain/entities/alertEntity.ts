export type AlertType = 'LOW_STOCK' | 'EXPIRY';

export interface Alert {
  id: number;
  userId: number;
  productId?: number;
  type: AlertType;
  message?: string;
  triggerAt: string;
  active: boolean;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}
