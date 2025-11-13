import type { UpdateShoppingItemDto } from "@/data/dto/shoppingItemDto";
import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import type { ShoppingItemRepository } from "@/domain/repositories/shoppingItemRepository";

export class UpdateShoppingItemUseCase {
  private readonly shoppingItemRepository: ShoppingItemRepository;

  constructor(shoppingItemRepository: ShoppingItemRepository) {
    this.shoppingItemRepository = shoppingItemRepository;
  }

  async execute(
    shoppingItemId: number,
    dto: UpdateShoppingItemDto,
  ): Promise<ShoppingItem> {
    return await this.shoppingItemRepository.updateShoppingItem(shoppingItemId, dto);
  }
}
