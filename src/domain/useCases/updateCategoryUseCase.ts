import { CategoryRepository } from "../repositories/categoryRepository";
import { Category } from "../entities/categoryEntity";
import { UpdateCategoryDto } from "@/data/dto/categoryDto";

// Caso de uso para actualizar una categoría existente

export class UpdateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(categoryId: number, dto: UpdateCategoryDto): Promise<Category> {
    return await this.categoryRepository.updateCategory(categoryId, dto);
  }
}
