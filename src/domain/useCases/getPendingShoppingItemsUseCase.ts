import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import type { ShoppingItemRepository } from "@/domain/repositories/shoppingItemRepository";

export class GetPendingShoppingItemsUseCase {
  private readonly shoppingItemRepository: ShoppingItemRepository;

  constructor(shoppingItemRepository: ShoppingItemRepository) {
    this.shoppingItemRepository = shoppingItemRepository;
  }

  async execute(userId: number): Promise<ShoppingItem[]> {
    return await this.shoppingItemRepository.getPendingShoppingItems(userId);
  }
}
