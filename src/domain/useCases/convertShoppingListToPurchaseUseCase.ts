import type { ShoppingListRepository, ShoppingListWithItems } from "../repositories/shoppingListRepository";

export class ConvertShoppingListToPurchaseUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(shoppingListId: number): Promise<ShoppingListWithItems> {
    return await this.shoppingListRepository.convertListToPurchase(shoppingListId);
  }
}
