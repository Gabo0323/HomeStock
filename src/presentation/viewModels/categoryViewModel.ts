import { makeAutoObservable } from "mobx";
import { Category } from "@/domain/entities/categoryEntity";
import { CreateCategoryDto, UpdateCategoryDto } from "@/data/dto/categoryDto";
import { GetAllCategoriesUseCase } from "@/domain/useCases/getAllCategoriesUseCase";
import { CreateCategoryUseCase } from "@/domain/useCases/createCategoryUseCase";
import { UpdateCategoryUseCase } from "@/domain/useCases/updateCategoryUseCase";
import { DeleteCategoryUseCase } from "@/domain/useCases/deleteCategoryUseCase";

/*
 * ViewModel de Categorías
 * Administra el estado observable y conecta la capa de UI con los casos de uso del dominio.
 */
export class CategoryViewModel {
  private getAllCategoriesUseCase: GetAllCategoriesUseCase;
  private createCategoryUseCase: CreateCategoryUseCase;
  private updateCategoryUseCase: UpdateCategoryUseCase;
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  // Estado observable
  categories: Category[] = [];
  category: Category | null = null;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    getAllCategoriesUseCase: GetAllCategoriesUseCase,
    createCategoryUseCase: CreateCategoryUseCase,
    updateCategoryUseCase: UpdateCategoryUseCase,
    deleteCategoryUseCase: DeleteCategoryUseCase
  ) {
    makeAutoObservable(this);
    this.getAllCategoriesUseCase = getAllCategoriesUseCase;
    this.createCategoryUseCase = createCategoryUseCase;
    this.updateCategoryUseCase = updateCategoryUseCase;
    this.deleteCategoryUseCase = deleteCategoryUseCase;
  }

  /*
   *  Obtiene todas las categorías
   */
  async getAllCategories() {
    this.loading = true;
    this.error = null;
    try {
      this.categories = await this.getAllCategoriesUseCase.execute();
    } catch (err: any) {
      this.error = err.message || "Error al obtener categorías";
    } finally {
      this.loading = false;
    }
  }

  /*
   * Crea una nueva categoría
   */
  async createCategory(dto: CreateCategoryDto) {
    this.loading = true;
    this.error = null;
    try {
      const newCategory = await this.createCategoryUseCase.execute(dto);
      this.categories.push(newCategory);
      this.category = newCategory;
    } catch (err: any) {
      this.error = err.message || "Error al crear categoría";
    } finally {
      this.loading = false;
    }
  }

  /*
   * Actualiza una categoría existente
   */
  async updateCategory(categoryId: number, dto: UpdateCategoryDto) {
    this.loading = true;
    this.error = null;
    try {
      const updated = await this.updateCategoryUseCase.execute(categoryId, dto);
      await this.getAllCategories();
      this.categories = this.categories.map((cat) =>
        cat.id === categoryId ? updated : cat
      );
      this.category = updated;
    } catch (err: any) {
      this.error = err.message || "Error al actualizar categoría";
    } finally {
      this.loading = false;
    }
  }

  /*
   * Elimina una categoría
   */
  async deleteCategory(categoryId: number) {
    this.loading = true;
    this.error = null;
    try {
      await this.deleteCategoryUseCase.execute(categoryId);
      this.categories = this.categories.filter((cat) => cat.id !== categoryId);
    } catch (err: any) {
      this.error = err.message || "Error al eliminar categoría";
    } finally {
      this.loading = false;
    }
  }
}
