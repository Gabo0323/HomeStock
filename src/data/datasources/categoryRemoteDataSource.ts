import { axiosClient } from "../../api/axiosClient";
import { CreateCategoryDto, UpdateCategoryDto } from "../dto/categoryDto";

/* DataSource remoto para gestionar las operaciones con categorías
 * Se conecta directamente con los endpoints del backend.
 */
export class CategoryRemoteDataSource {

  /* Obtiene todas las categorías disponibles
   * GET /api/v1/categories
   */
  async getAllCategories() {
    try {
      const response = await axiosClient.get("/categories");
      return response.data;
    } catch (error: any) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  }

  /* Crea una nueva categoría
   * POST /api/v1/categories
   */
  async createCategory(dto: CreateCategoryDto) {
    try {
      const response = await axiosClient.post("/categories", dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al crear categoría:", error);
      throw error;
    }
  }

  /* Actualiza una categoría existente
   * PATCH /api/v1/categories/{categoryId}
   */
  async updateCategory(categoryId: number, dto: UpdateCategoryDto) {
    try {
      const response = await axiosClient.patch(`/categories/${categoryId}`, dto);
      return response.data;
    } catch (error: any) {
      console.error("Error al actualizar categoría:", error);
      throw error;
    }
  }

  /* Elimina una categoría por ID
   * DELETE /api/v1/categories/{categoryId}
   */
  async deleteCategory(categoryId: number) {
    try {
      await axiosClient.delete(`/categories/${categoryId}`);
      return true;
    } catch (error: any) {
      console.error("Error al eliminar categoría:", error);
      throw error;
    }
  }
}
