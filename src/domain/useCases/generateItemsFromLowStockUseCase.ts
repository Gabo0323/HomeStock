import type { ShoppingListRepository, ShoppingListWithItems } from "../repositories/shoppingListRepository";

export class GenerateItemsFromLowStockUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(shoppingListId: number): Promise<ShoppingListWithItems> {
    return await this.shoppingListRepository.generateItemsFromLowStock(shoppingListId);
  }
}
