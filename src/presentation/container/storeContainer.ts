// src/container/storeContainer.ts

import { StoreRemoteDataSource } from "@/data/datasources/storeRemoteDataSource";
import { StoreRepositoryImpl } from "@/data/repositories/storeRepositoryImpl";

import { CreateStoreUseCase } from "@/domain/useCases/createStoreUseCase";
import { GetStoresUseCase } from "@/domain/useCases/getStoresUseCase";
import { UpdateStoreUseCase } from "@/domain/useCases/updateStoreUseCase";
import { DeleteStoreUseCase } from "@/domain/useCases/deleteStoreUseCase";

import { StoreViewModel } from "@/presentation/viewModels/storeViewModel";

// --------------------------------------------------
// 🔧 Crear instancias base
// --------------------------------------------------

const remoteDataSource = new StoreRemoteDataSource();
const repository = new StoreRepositoryImpl(remoteDataSource);

// --------------------------------------------------
// 🧠 Casos de uso (Clean Architecture)
// --------------------------------------------------

const createStoreUseCase = new CreateStoreUseCase(repository);
const getAllStoresUseCase = new GetStoresUseCase(repository);
const updateStoreUseCase = new UpdateStoreUseCase(repository);
const deleteStoreUseCase = new DeleteStoreUseCase(repository);

// --------------------------------------------------
// 🟢 ViewModel listo para la UI
// --------------------------------------------------

export const storeViewModel = new StoreViewModel(
  getAllStoresUseCase,
  createStoreUseCase,
  updateStoreUseCase,
  deleteStoreUseCase
);
