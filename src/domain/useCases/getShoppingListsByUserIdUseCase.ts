import type { ShoppingList } from "../entities/shoppinListEntity";
import type { ShoppingListRepository } from "../repositories/shoppingListRepository";

export class GetShoppingListsByUserIdUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(userId: number): Promise<ShoppingList[]> {
    return await this.shoppingListRepository.getShoppingListsByUserId(userId);
  }
}
