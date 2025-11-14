// src/container/categoryContainer.ts

import { CategoryRemoteDataSource } from "@/data/datasources/categoryRemoteDataSource";
import { CategoryRepositoryImpl } from "@/data/repositories/categoryRepositoryImpl";
import { CreateCategoryUseCase } from "@/domain/useCases/createCategoryUseCase";
import { GetAllCategoriesUseCase } from "@/domain/useCases/getAllCategoriesUseCase";
import { UpdateCategoryUseCase } from "@/domain/useCases/updateCategoryUseCase";
import { DeleteCategoryUseCase } from "@/domain/useCases/deleteCategoryUseCase";

import { CategoryViewModel } from "@/presentation/viewModels/categoryViewModel";

// 1️⃣ Datasource
const remoteDataSource = new CategoryRemoteDataSource();

// 2️⃣ Repository
const repository = new CategoryRepositoryImpl(remoteDataSource);

// 3️⃣ UseCases
const createCategoryUseCase = new CreateCategoryUseCase(repository);
const getAllCategoriesUseCase = new GetAllCategoriesUseCase(repository);
const updateCategoryUseCase = new UpdateCategoryUseCase(repository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(repository);

// 4️⃣ ViewModel
export const categoryViewModel = new CategoryViewModel(
  getAllCategoriesUseCase,
  createCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase
);
