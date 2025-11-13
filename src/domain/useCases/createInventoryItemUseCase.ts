import { InventoryRepository } from "../repositories/inventoryRepository";

export class CreateInventoryItemUseCase {
  constructor(private repository: InventoryRepository) {}

  async execute(
    productId: number,
    quantity: number,
    purchaseLocationId?: number
  ) {
    return await this.repository.createInventoryItem(
      productId,
      quantity,
      purchaseLocationId
    );
  }
}
