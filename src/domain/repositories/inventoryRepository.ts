export interface InventoryRepository {
  getInventory(
    page: number,
    size: number
  ): Promise<{
    content: any[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  }>;

  createInventoryItem(
    productId: number,
    quantity: number,
    purchaseLocationId?: number
  ): Promise<any>;

  bulkConsume(
    userId: number,
    items: { productId: number; quantity: number }[]
  ): Promise<any[]>;

  transferStock(
    userId: number,
    productId: number,
    fromLocationId: number,
    toLocationId: number,
    quantity: number
  ): Promise<any>;
}
