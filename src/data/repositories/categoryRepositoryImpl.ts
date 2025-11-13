import { Category } from "@/domain/entities/categoryEntity";
import { CategoryRepository } from "@/domain/repositories/categoryRepository";
import { CategoryRemoteDataSource } from "../datasources/categoryRemoteDataSource";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/categoryDto";
import { mapDtoToCategory } from "../mapper/categoryMapper";

export class CategoryRepositoryImpl implements CategoryRepository {
  private remoteDataSource: CategoryRemoteDataSource;

  constructor(remoteDataSource: CategoryRemoteDataSource) {
    this.remoteDataSource = remoteDataSource;
  }

  // Obtiene todas las categorías
   
  async getAllCategories(): Promise<Category[]> {
    try {
      const result = await this.remoteDataSource.getAllCategories();
      return result.map((dto: any) => mapDtoToCategory(dto));
    } catch (error) {
      console.error("Error en CategoryRepositoryImpl.getAllCategories:", error);
      throw error;
    }
  }

  // Crea una nueva categoría
   
  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    try {
      const result = await this.remoteDataSource.createCategory(dto);
      return mapDtoToCategory(result);
    } catch (error) {
      console.error("Error en CategoryRepositoryImpl.createCategory:", error);
      throw error;
    }
  }

  // Actualiza una categoría existente

  async updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<Category> {
    try {
      const result = await this.remoteDataSource.updateCategory(categoryId, dto);
      return mapDtoToCategory(result);
    } catch (error) {
      console.error("Error en CategoryRepositoryImpl.updateCategory:", error);
      throw error;
    }
  }

  // Elimina una categoría

  async deleteCategory(categoryId: number): Promise<boolean> {
    try {
      return await this.remoteDataSource.deleteCategory(categoryId);
    } catch (error) {
      console.error("Error en CategoryRepositoryImpl.deleteCategory:", error);
      throw error;
    }
  }
}
