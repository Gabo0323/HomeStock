import { Category } from "../entities/categoryEntity";
import { CreateCategoryDto, UpdateCategoryDto } from "@/data/dto/categoryDto";

export interface CategoryRepository {
  getAllCategories(): Promise<Category[]>;
  createCategory(dto: CreateCategoryDto): Promise<Category>;
  updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<Category>;
  deleteCategory(categoryId: number): Promise<boolean>;
}