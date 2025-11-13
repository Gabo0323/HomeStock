import type { UpdateShoppingListItemDto } from "@/data/dto/shoppingListDto";
import type { ShoppingListItem } from "../entities/shoppinListEntity";
import type { ShoppingListRepository } from "../repositories/shoppingListRepository";

export class UpdateShoppingListItemUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(
    shoppingListId: number,
    shoppingListItemId: number,
    dto: UpdateShoppingListItemDto,
  ): Promise<ShoppingListItem> {
    return await this.shoppingListRepository.updateShoppingListItem(
      shoppingListId,
      shoppingListItemId,
      dto,
    );
  }
}
