import type { CreateShoppingListDto } from "@/data/dto/shoppingListDto";
import type { ShoppingList } from "../entities/shoppinListEntity";
import type { ShoppingListRepository } from "../repositories/shoppingListRepository";

export class CreateShoppingListUseCase {
  private readonly shoppingListRepository: ShoppingListRepository;

  constructor(shoppingListRepository: ShoppingListRepository) {
    this.shoppingListRepository = shoppingListRepository;
  }

  async execute(dto: CreateShoppingListDto): Promise<ShoppingList> {
    return await this.shoppingListRepository.createShoppingList(dto);
  }
}
