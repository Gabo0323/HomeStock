import type { ShoppingListRepository, ShoppingListWithItems } from "../repositories/shoppingListRepository";

export class GetShoppingListByIdUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(shoppingListId: number): Promise<ShoppingListWithItems> {
    return await this.shoppingListRepository.getShoppingListById(shoppingListId);
  }
}
