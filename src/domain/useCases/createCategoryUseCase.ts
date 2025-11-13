import { CategoryRepository } from "../repositories/categoryRepository";
import { Category } from "../entities/categoryEntity";
import { CreateCategoryDto } from "@/data/dto/categoryDto";

// Caso de uso para crear una nueva categoría

export class CreateCategoryUseCase {
  private categoryRepository: CategoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute(dto: CreateCategoryDto): Promise<Category> {
    return await this.categoryRepository.createCategory(dto);
  }
}
