import { CategoryRepository } from "../repositories/categoryRepository";

// Caso de uso para eliminar una categoría por su ID

export class DeleteCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: number): Promise<boolean> {
    return await this.categoryRepository.deleteCategory(categoryId);
  }
}
