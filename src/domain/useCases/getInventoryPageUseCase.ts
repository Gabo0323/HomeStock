import { InventoryRepository } from "../repositories/inventoryRepository";

export class GetInventoryPageUseCase {
  constructor(private repository: InventoryRepository) {}

  async execute(page: number, size: number) {
    return await this.repository.getInventory(page, size);
  }
}
