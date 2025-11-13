import { CategoryRepository } from "../repositories/categoryRepository";
import { Category } from "../entities/categoryEntity";

//Caso de uso para obtener todas las categorías

export class GetAllCategoriesUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories();
  }
}
