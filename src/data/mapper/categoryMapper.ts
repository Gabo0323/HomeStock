import { Category } from "@/domain/entities/categoryEntity";
import { CategoryDto, CreateCategoryDto, UpdateCategoryDto } from "../dto/categoryDto";

/*🔹 Mapea un DTO recibido del backend a una entidad Category interna*/
export function mapDtoToCategory(dto: any): Category {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}

/* 🔹 Mapea una entidad Category a un DTO para creación */
export function mapCategoryToCreateDto(category: Category): CreateCategoryDto {
  return {
    name: category.name,
    description: category.description ?? "",
  };
}

/* 🔹 Mapea una entidad Category parcial a un DTO para actualización*/
export function mapCategoryToUpdateDto(category: Partial<Category>): UpdateCategoryDto {
  return {
    description: category.description ?? "",
  };
}