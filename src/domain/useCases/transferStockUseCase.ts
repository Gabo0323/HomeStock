import { InventoryRepository } from "../repositories/inventoryRepository";

export class TransferStockUseCase {
  constructor(private repository: InventoryRepository) {}

  async execute(
    userId: number,
    productId: number,
    fromLocationId: number,
    toLocationId: number,
    quantity: number
  ) {
    return await this.repository.transferStock(
      userId,
      productId,
      fromLocationId,
      toLocationId,
      quantity
    );
  }
}
