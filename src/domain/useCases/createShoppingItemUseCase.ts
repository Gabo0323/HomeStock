import type { CreateShoppingItemDto } from "@/data/dto/shoppingItemDto";
import type { ShoppingItem } from "@/domain/entities/shoppingItemEntity";
import type { ShoppingItemRepository } from "@/domain/repositories/shoppingItemRepository";

export class CreateShoppingItemUseCase {
  private readonly shoppingItemRepository: ShoppingItemRepository;

  constructor(shoppingItemRepository: ShoppingItemRepository) {
    this.shoppingItemRepository = shoppingItemRepository;
  }

  async execute(dto: CreateShoppingItemDto): Promise<ShoppingItem> {
    return await this.shoppingItemRepository.createShoppingItem(dto);
  }
}
