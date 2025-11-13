export interface CategoryDto {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
}

export interface UpdateCategoryDto {
  description?: string;
}
/*
export interface CategoryListResponse {
  products: CategoryDto[];
}*/
export interface CategoryListResponse {
  categories: CategoryDto[];
}