import type { AddItemToShoppingListDto } from "@/data/dto/shoppingListDto";
import type { ShoppingListItem } from "../entities/shoppinListEntity";
import type { ShoppingListRepository } from "../repositories/shoppingListRepository";

export class AddItemToShoppingListUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(
    shoppingListId: number,
    dto: AddItemToShoppingListDto,
  ): Promise<ShoppingListItem> {
    return await this.shoppingListRepository.addItemToShoppingList(shoppingListId, dto);
  }
}
