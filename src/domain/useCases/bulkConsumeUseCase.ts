import { InventoryRepository } from "../repositories/inventoryRepository";

export class BulkConsumeUseCase {
  constructor(private repository: InventoryRepository) {}

  async execute(userId: number, items: { productId: number; quantity: number }[]) {
    return await this.repository.bulkConsume(userId, items);
  }
}
